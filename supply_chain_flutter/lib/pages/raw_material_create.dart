import 'dart:convert';
import 'dart:io';
import 'package:flutter/material.dart';
import 'package:http_parser/http_parser.dart';
import 'package:image_picker/image_picker.dart';
import 'package:http/http.dart' as http;
import 'package:supply_chain_flutter/model/rawmatcategory.dart';
import 'package:supply_chain_flutter/util/notify_util.dart';

class RawMatCreatePage extends StatefulWidget {
  const RawMatCreatePage({Key? key}) : super(key: key);

  @override
  _RawMatCreatePageState createState() => _RawMatCreatePageState();
}

class _RawMatCreatePageState extends State<RawMatCreatePage> {
  final TextEditingController nameTEC = TextEditingController();
  final TextEditingController quantityTEC = TextEditingController(text: '0');
  RawMatCategory? selectedCategory;
  File? selectedImage;
  List<RawMatCategory> categories = [];
  final ImagePicker _picker = ImagePicker();

  @override
  void initState() {
    super.initState();
    _loadCategories();
  }

  Future<void> _loadCategories() async {
    try {
      final response = await http.get(Uri.parse('http://localhost:8080/api/rawmaterial/categories'));
      if (response.statusCode == 200) {
        setState(() {
          categories = (json.decode(response.body) as List)
              .map((category) => RawMatCategory.fromJson(category))
              .toList();
        });
      } else {
        NotifyUtil.error(context, 'Failed to load categories');
      }
    } catch (e) {
      NotifyUtil.error(context, 'Error loading categories: $e');
    }
  }

  Future<void> pickImage() async {
    final XFile? pickedImage = await _picker.pickImage(source: ImageSource.gallery);
    if (pickedImage != null) {
      setState(() {
        selectedImage = File(pickedImage.path);
      });
    }
  }

  Future<void> submitRawMaterial() async {
    final rawMaterial = {
      'name': nameTEC.text,
      'quantity': int.tryParse(quantityTEC.text) ?? 0,
      'category': selectedCategory != null ? selectedCategory!.id : null,
    };

    var uri = Uri.parse('http://localhost:8080/api/rawmaterial/save');
    var request = http.MultipartRequest('POST', uri);

    request.files.add(
      http.MultipartFile.fromString(
        'rawMaterial',
        jsonEncode(rawMaterial),
        contentType: MediaType('application', 'json'),
      ),
    );

    if (selectedImage != null) {
      request.files.add(
        await http.MultipartFile.fromPath(
          'imageFile',
          selectedImage!.path,
        ),
      );
    }

    try {
      var response = await request.send();
      if (response.statusCode == 200) {
        NotifyUtil.success(context, 'Raw Material saved successfully');
      } else {
        NotifyUtil.error(context, 'Failed to save. Status code: ${response.statusCode}');
      }
    } catch (e) {
      NotifyUtil.error(context, 'Error occurred while submitting: $e');
    }
  }

  void _showAddCategoryDialog() {
    final TextEditingController categoryNameController = TextEditingController();

    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: const Text('Add New Category'),
          content: TextField(
            controller: categoryNameController,
            decoration: const InputDecoration(
              labelText: "Category Name",
              border: OutlineInputBorder(),
            ),
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(context),
              child: const Text('Cancel'),
            ),
            TextButton(
              onPressed: () {
                final categoryName = categoryNameController.text.trim();
                if (categoryName.isNotEmpty) {
                  addNewCategory(categoryName);
                  Navigator.pop(context);
                } else {
                  NotifyUtil.error(context, 'Category name cannot be empty');
                }
              },
              child: const Text('Add'),
            ),
          ],
        );
      },
    );
  }

  Future<void> addNewCategory(String name) async {
    var uri = Uri.parse('http://localhost:8080/api/rawmaterial/category/save');
    var response = await http.post(
      uri,
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'name': name}),
    );

    if (response.statusCode == 200) {
      final newCategory = RawMatCategory.fromJson(json.decode(response.body));
      setState(() {
        categories.add(newCategory);
        selectedCategory = newCategory;
      });
      NotifyUtil.success(context, 'Category added successfully');
    } else {
      NotifyUtil.error(context, 'Failed to add category');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Add Raw Material"),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(30),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Center(
              child: Text(
                "Raw Material",
                style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
              ),
            ),
            const SizedBox(height: 10),
            TextField(
              controller: nameTEC,
              decoration: const InputDecoration(
                labelText: "Name",
                border: OutlineInputBorder(),
                icon: Icon(Icons.label),
              ),
            ),
            const SizedBox(height: 10),
            TextField(
              controller: quantityTEC,
              keyboardType: TextInputType.number,
              decoration: const InputDecoration(
                labelText: "Quantity",
                border: OutlineInputBorder(),
                icon: Icon(Icons.format_list_numbered),
              ),
            ),
            const SizedBox(height: 10),
            Row(
              children: [
                Expanded(
                  child: DropdownButtonFormField<RawMatCategory>(
                    value: selectedCategory,
                    hint: const Text("Select Category"),
                    items: categories.map((RawMatCategory category) {
                      return DropdownMenuItem<RawMatCategory>(
                        value: category,
                        child: Text(category.name ?? ''),
                      );
                    }).toList(),
                    onChanged: (RawMatCategory? newValue) {
                      setState(() {
                        selectedCategory = newValue;
                      });
                    },
                    decoration: const InputDecoration(
                      labelText: "Category",
                      border: OutlineInputBorder(),
                      icon: Icon(Icons.category),
                    ),
                  ),
                ),
                IconButton(
                  icon: Icon(Icons.add),
                  onPressed: _showAddCategoryDialog,
                ),
              ],
            ),
            const SizedBox(height: 10),
            ElevatedButton.icon(
              icon: const Icon(Icons.image),
              label: const Text('Pick Image'),
              onPressed: pickImage,
            ),
            if (selectedImage != null)
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: Image.file(selectedImage!, height: 100, width: 100, fit: BoxFit.cover),
              ),
            const SizedBox(height: 20),
            ElevatedButton(
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.blue,
              ),
              onPressed: submitRawMaterial,
              child: const Text(
                "Save Raw Material",
                style: TextStyle(color: Colors.white),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
