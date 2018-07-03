{
  "targets": [
    {
      "target_name": "native",
      "sources": [
        "binding.cpp"
      ],
      "include_dirs": [
        "<!@(node -p \"require('node-addon-api').include\")",
        "/usr/include/ossim/util",
        "/usr/include/ossim/base",
        "/usr/include/ossim/elevation",
        "/usr/include/ossim/font",
        "/usr/include/ossim/imaging",
        "/usr/include/ossim/reg",
        "/usr/include/ossim/init",
        "/usr/include/ossim/matrix",
        "/usr/include/ossim/parallel",
        "/usr/include/ossim/plugin",
        "/usr/include/ossim/point_cloud",
        "/usr/include/ossim/projection",
        "/usr/include/ossim/support_data",
        "/usr/include/ossim/vec",
        "/usr/include/ossim/video",
        "/usr/include/ossim/vpfutil",
        "/usr/include/ossim/sockets",
        "/usr/include/jsoncpp"
      ],
      "dependencies": [
        "<!(node -p \"require('node-addon-api').gyp\")"
      ],
      "libraries": ["/usr/lib64/libossim.so","/usr/lib64/libjsoncpp.so"],
      "cflags!": ["-fno-exceptions"],
      'cflags_cc!': [ '-fno-rtti' ],
      "defines": ["NAPI_CPP_EXCEPTIONS"],
      'defines': [ 'NAPI_DISABLE_CPP_EXCEPTIONS' ],
    }
  ]
}