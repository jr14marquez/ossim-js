#include <napi.h>
#include <ossimInfo.h>
#include <iostream>
#include <ostream>

using namespace Napi;
String metadata(const CallbackInfo& info) {
  Env env = info.Env();
  std::string filename = info[0].As<String>().Utf8Value();

  std::string key;
  std::string value;
  ossimKeywordlist kwl;

  //const ossimFilename = "/home/rmarquez/Downloads/images/17MAR20054817-P1BS-056599362010_01_P004.NTF";

  // key = "build_date";
  // value = "true";
  // kwl.addPair( key, value );

  // key = "image_file";
  // value =filename;
  // kwl.addPair( key, value );

  // key = "geometry_info";
  // kwl.addPair( key, value );

  // key = "image_info";
  // kwl.addPair( key, value );

  // key = "metadata";
  // kwl.addPair( key, value );
            
  // Make the info object.
  ossimInfo* oi = new ossimInfo();

   // Pass options in:
  ossimTool* ot = dynamic_cast<ossimTool*>(oi);
  if ( ot )
  {
    ot->initialize( kwl );
  }
  
  oi->getImageInfo( filename, false, false, false, true, false, false, kwl );

  std::stringstream out;
  const std::string rootTag="info";
  kwl.toJSON(out,rootTag);

  //return Object::New(env, kwl);
  return String::New(env,out.str());//working example returning string
}

Object Init(Env env, Object exports) {
  exports.Set(String::New(env,"metadata"), Function::New(env, metadata));
  return exports;
}
NODE_API_MODULE(addon, Init)