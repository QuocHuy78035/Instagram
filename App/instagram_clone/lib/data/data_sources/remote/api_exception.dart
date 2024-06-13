class ApiException implements Exception{
  final dynamic message;
  const ApiException({required this.message});

  @override
  String toString() {
    if(message is String){
      return message;
    }else{
      return "Error Occurred: $message";
    }
  }
}