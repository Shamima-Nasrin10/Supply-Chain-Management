import 'package:flutter/material.dart';
import 'package:supply_chain_flutter/model/rawmatcategory.dart';
import 'package:supply_chain_flutter/service/rawmatcategory.dart';
import 'package:supply_chain_flutter/util/apiresponse.dart';

import '../util/notify_util.dart';

class RawMaterialCategoryListPage extends StatefulWidget {
  @override
  _RawMaterialCategoryListPageState createState() => _RawMaterialCategoryListPageState();
}

class _RawMaterialCategoryListPageState extends State<RawMaterialCategoryListPage> {
  final RawMaterialCategoryService _service = RawMaterialCategoryService();
  List<RawMatCategory> _categories = [];

  @override
  void initState() {
    super.initState();
    _fetchCategories();
  }

  Future<void> _fetchCategories() async {
    ApiResponse response = await _service.getAllRawMaterialCategories();
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

  Future<void> _deleteCategory(int id) async {
    ApiResponse response = await _service.deleteRawMaterialCategoryById(id);
    if (response.success) {
      NotifyUtil.success(context, response.message);
      _fetchCategories(); // Refresh the list after deletion
    } else {
      NotifyUtil.error(context, response.message ?? 'Failed to delete category');
    }
  }

  void _showCreateCategoryDialog() {
    final _nameController = TextEditingController();

    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: Text('Create Category'),
          content: TextField(
            controller: _nameController,
            decoration: InputDecoration(labelText: 'Category Name'),
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.of(context).pop(),
              child: Text('Cancel'),
            ),
            TextButton(
              onPressed: () async {
                final name = _nameController.text.trim();
                if (name.isNotEmpty) {
                  RawMatCategory newCategory = RawMatCategory(name: name);
                  ApiResponse response = await _service.saveRawMaterialCategory(newCategory);
                  if (response.success) {
                    NotifyUtil.success(context, response.message ?? 'Category saved successfully');
                    Navigator.of(context).pop(); // Close the dialog
                    _fetchCategories(); // Refresh the list to show the new category
                  } else {
                    NotifyUtil.error(context, response.message ?? 'Failed to save category');
                  }
                } else {
                  NotifyUtil.error(context, 'Category name cannot be empty');
                }
              },
              child: Text('Save'),
            ),
          ],
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Raw Material Categories'),
      ),
      body: _categories.isEmpty
          ? Center(child: Text('No categories available'))
          : ListView.builder(
        itemCount: _categories.length,
        itemBuilder: (context, index) {
          final category = _categories[index];
          return ListTile(
            title: Text(category.name ?? 'Unnamed Category'),
            trailing: IconButton(
              icon: Icon(Icons.delete),
              onPressed: () => _deleteCategory(category.id!),
            ),
          );
        },
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _showCreateCategoryDialog,
        child: Icon(Icons.add),
        tooltip: 'Create Category',
      ),
    );
  }
}
