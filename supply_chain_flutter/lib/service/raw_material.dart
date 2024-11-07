import 'dart:convert';
import 'dart:io';
import 'package:http/http.dart' as http;
import 'package:http_parser/http_parser.dart';
import 'package:path/path.dart';
import '../model/raw_material.dart';
import '../util/apiresponse.dart';

class RawMaterialService {
  final String apiUrl = 'http://localhost:8080/api/rawmaterial';

  // Get all raw materials
  Future<ApiResponse> getAllRawMaterials() async {
    final response = await http.get(Uri.parse('$apiUrl/list'));

    if (response.statusCode == 200) {
      return ApiResponse.fromJson(jsonDecode(response.body));
    } else {
      return ApiResponse(
        success: false,
        message: "Failed to fetch raw materials: ${response.reasonPhrase}",
      );
    }
  }

  // Save a new raw material with an optional image file
  Future<ApiResponse> saveRawMaterial(RawMaterial rawMaterial, {File? imageFile}) async {
    final uri = Uri.parse('$apiUrl/save');
    final request = http.MultipartRequest('POST', uri);

    // Add the raw material as a JSON part
    request.fields['rawMaterial'] = jsonEncode(rawMaterial.toJson());

    // Add the image file if provided
    if (imageFile != null) {
      request.files.add(
        http.MultipartFile(
          'imageFile',
          imageFile.readAsBytes().asStream(),
          imageFile.lengthSync(),
          filename: basename(imageFile.path),
          contentType: MediaType('image', 'jpeg'), // Update type if needed
        ),
      );
    }

    // Send the request
    final response = await request.send();

    // Check the response status and handle it
    if (response.statusCode == 200) {
      final responseBody = await http.Response.fromStream(response);
      return ApiResponse.fromJson(jsonDecode(responseBody.body));
    } else {
      return ApiResponse(
        success: false,
        message: "Failed to save raw material: ${response.reasonPhrase}",
      );
    }
  }

  // Update an existing raw material with an optional image file
  Future<ApiResponse> updateRawMaterial(RawMaterial rawMaterial, {File? imageFile}) async {
    final uri = Uri.parse('$apiUrl/update');
    final request = http.MultipartRequest('PUT', uri);

    // Add the raw material as a JSON part
    request.fields['rawMaterial'] = jsonEncode(rawMaterial.toJson());

    // Add the image file if provided
    if (imageFile != null) {
      request.files.add(
        http.MultipartFile(
          'imageFile',
          imageFile.readAsBytes().asStream(),
          imageFile.lengthSync(),
          filename: basename(imageFile.path),
          contentType: MediaType('image', 'jpeg'), // Update type if needed
        ),
      );
    }

    // Send the request
    final response = await request.send();

    // Check the response status and handle it
    if (response.statusCode == 200) {
      final responseBody = await http.Response.fromStream(response);
      return ApiResponse.fromJson(jsonDecode(responseBody.body));
    } else {
      return ApiResponse(
        success: false,
        message: "Failed to update raw material: ${response.reasonPhrase}",
      );
    }
  }

  // Delete a raw material by ID
  Future<ApiResponse> deleteRawMaterialById(int id) async {
    final response = await http.delete(Uri.parse('$apiUrl/delete/$id'));

    if (response.statusCode == 200) {
      return ApiResponse.fromJson(jsonDecode(response.body));
    } else {
      return ApiResponse(
        success: false,
        message: "Failed to delete raw material: ${response.reasonPhrase}",
      );
    }
  }

  // Find a raw material by ID
  Future<ApiResponse> findRawMaterialById(int id) async {
    final response = await http.get(Uri.parse('$apiUrl/$id'));

    if (response.statusCode == 200) {
      return ApiResponse.fromJson(jsonDecode(response.body));
    } else {
      return ApiResponse(
        success: false,
        message: "Failed to find raw material: ${response.reasonPhrase}",
      );
    }
  }
}
