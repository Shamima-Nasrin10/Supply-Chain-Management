import 'dart:io';
import 'package:flutter/material.dart';
import 'package:flutter/foundation.dart' show kIsWeb;
import 'package:image_picker/image_picker.dart';
import 'package:file_picker/file_picker.dart';
import 'package:supply_chain_flutter/model/raw_material.dart';
import 'package:supply_chain_flutter/model/rawmatcategory.dart';
import 'package:supply_chain_flutter/service/rawmatcategory.dart';
import 'package:supply_chain_flutter/service/raw_material.dart';
import 'package:supply_chain_flutter/util/notify_util.dart';
import 'dart:typed_data';


class RawMaterialCreatePage extends StatefulWidget {
  final RawMaterial? rawMaterial;

  const RawMaterialCreatePage({Key? key, this.rawMaterial}) : super(key: key);

  @override
  _RawMaterialCreatePageState createState() => _RawMaterialCreatePageState();
}

class _RawMaterialCreatePageState extends State<RawMaterialCreatePage> {
  final _formKey = GlobalKey<FormState>();
  final _nameController = TextEditingController();
  final ImagePicker _picker = ImagePicker();
  File? _imageFile;
  Uint8List? _webImageBytes;

  RawMaterial _rawMaterial = RawMaterial(name: '', unit: Unit.PIECE, quantity: 0);
  List<RawMatCategory> _categories = [];

  @override
  void initState() {
    super.initState();
    if (widget.rawMaterial != null) {
      _rawMaterial = widget.rawMaterial!;
      _nameController.text = _rawMaterial.name;
    }
    _loadCategories();
  }

  Future<void> _loadCategories() async {
    final response = await RawMaterialCategoryService().getAllRawMaterialCategories();

    if (response.success) {
      setState(() {
        _categories = (response.data?['categories'] as List)
            .map((json) => RawMatCategory.fromJson(json))
            .toList();
      });
    } else {
      NotifyUtil.error(context, response.message ?? 'Failed to load categories');
    }
  }

  Future<void> _pickImage() async {
    if (kIsWeb) {
      // For Web: Use File Picker and access bytes
      final result = await FilePicker.platform.pickFiles(type: FileType.image);
      if (result != null && result.files.single.bytes != null) {
        setState(() {
          _webImageBytes = result.files.single.bytes; // Store bytes for displaying or uploading
          _imageFile = null; // Clear _imageFile as it’s not used for web
        });
      } else {
        _showError("No image selected");
      }
    } else {
      // For Mobile/Desktop: Use Image Picker and access path
      final pickedFile = await _picker.pickImage(source: ImageSource.gallery);
      if (pickedFile != null) {
        setState(() {
          _imageFile = File(pickedFile.path);
          _webImageBytes = null; // Clear _webImageBytes as it’s not used for mobile/desktop
        });
      } else {
        _showError("No image selected");
      }
    }
  }

  void _showError(String message) {
    ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(message)));
  }

  void _onSubmit() async {
    if (_formKey.currentState?.validate() ?? false) {
      _rawMaterial.name = _nameController.text.trim();

      final apiResponse = widget.rawMaterial == null
          ? await RawMaterialService().saveRawMaterial(_rawMaterial, imageFile: _imageFile)
          : await RawMaterialService().updateRawMaterial(_rawMaterial, imageFile: _imageFile);

      if (apiResponse.success) {
        NotifyUtil.success(context, apiResponse.message ?? 'Raw Material saved successfully');
        Navigator.of(context).pop(true); // Close and refresh previous page
      } else {
        NotifyUtil.error(context, apiResponse.message ?? 'Failed to save Raw Material');
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.rawMaterial == null ? 'Create Raw Material' : 'Edit Raw Material'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: ListView(
            children: [
              // Name Field
              TextFormField(
                controller: _nameController,
                decoration: InputDecoration(labelText: 'Name'),
                validator: (value) {
                  if (value == null || value.trim().isEmpty) {
                    return 'Please enter a name';
                  }
                  return null;
                },
              ),
              const SizedBox(height: 16),

              // Unit Dropdown
              DropdownButtonFormField<Unit>(
                value: _rawMaterial.unit,
                items: Unit.values
                    .map((unit) => DropdownMenuItem(
                  value: unit,
                  child: Text(unit.toString().split('.').last),
                ))
                    .toList(),
                onChanged: (value) {
                  setState(() {
                    _rawMaterial.unit = value!;
                  });
                },
                decoration: InputDecoration(labelText: 'Unit'),
                validator: (value) => value == null ? 'Please select a unit' : null,
              ),
              const SizedBox(height: 16),

              // Image Upload Field
              Row(
                children: [
                  if (_imageFile != null)
                    Image.file(_imageFile!), // Display image for mobile/desktop
                  if (_webImageBytes != null)
                    Image.memory(_webImageBytes!), // Display image for web
                  SizedBox(height: 20),
                  ElevatedButton(
                    onPressed: _pickImage,
                    child: Text("Pick Image"),
                  ),
                ],
              ),
              const SizedBox(height: 16),

              // Category Dropdown
              DropdownButtonFormField<int>(
                value: _rawMaterial.category?.id,
                items: _categories
                    .map((category) => DropdownMenuItem(
                  value: category.id,
                  child: Text(category.name ?? ''),
                ))
                    .toList(),
                onChanged: (value) {
                  setState(() {
                    _rawMaterial.category =
                        _categories.firstWhere((category) => category.id == value);
                  });
                },
                decoration: InputDecoration(labelText: 'Category'),
                validator: (value) => value == null ? 'Please select a category' : null,
              ),
              const SizedBox(height: 24),

              // Submit Button
              ElevatedButton(
                onPressed: _onSubmit,
                child: Text(widget.rawMaterial == null ? 'Save' : 'Update'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
