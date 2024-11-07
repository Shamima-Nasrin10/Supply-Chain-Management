import 'package:flutter/material.dart';
import 'package:supply_chain_flutter/pages/homepage.dart';
import 'package:supply_chain_flutter/pages/raw_mat_category_create.dart';
import 'package:supply_chain_flutter/pages/raw_mat_category_list.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        debugShowCheckedModeBanner: false,
        home: RawMaterialCategoryListPage()
    );
  }

}