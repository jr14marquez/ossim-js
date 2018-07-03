#include <napi.h>
#include <ossimInfo.h>
using namespace Napi;
String metadata(const CallbackInfo& info) {
  Env env = info.Env();
  //std::string filename = info[0].As<String>().Utf8Value();


  std::string key;
  std::string value;
  std::string value2;
  ossimKeywordlist kwl;

  std::string blah;
  blah = "haha";

  //const ossimFilename& = "/home/rmarquez/Downloads/images/17MAR20054817-P1BS-056599362010_01_P004.NTF";


  key = "build_date";
  value = "true";
  kwl.addPair( key, value );

  key = "image_file";
  value2 = "/home/rmarquez/Downloads/images/17MAR20054817-P1BS-056599362010_01_P004.NTF";
  kwl.addPair( key, value2 );

  key = "geometry_info";
  kwl.addPair( key, value );

  key = "image_info";
  kwl.addPair( key, value );

  key = "metadata";
  kwl.addPair( key, value );

  // Sky is the limit on the keys you add...
            
  // Make the info object.
  ossimInfo* oi = new ossimInfo();

   // Pass options in:
  ossimTool* ot = dynamic_cast<ossimTool*>(oi);
  if ( ot )
  {
    ot->initialize( kwl );
  }

  //std::ostringstream output;
  
  oi->getImageInfo( "/home/rmarquez/Downloads/images/17MAR20054817-P1BS-056599362010_01_P004.NTF", false, false, false, true, false, false, kwl);
  //cout << "test: " << kwl;

  //const std::string& val = kwl.toString();
  //const char* val = strdup(kwl.toString()); // THIS WORKS DONT FUCK WITH IT

  //std::ostream out;
  std::stringstream out;
  const std::string rootTag="info";
  cout << "TEST1: " << kwl.toJSON(&out,&rootTag);
  //const char* val = strdup(kwl.toJSON(out,rootTag));

  //Object obj = Napi::Object::New(env);
  //obj.Set(Napi::String::New(env, "msg"), blah);

  //return obj;
  
  // Your stuff is now in the output object!!!
  //example: return String::New(env, hash.c_str(), crypto_pwhash_STRBYTES);
  //return Object::New(env, kwl);
  //return kwl;
  return String::New(env,blah);//working example returning string
  //return String::New(env,kwl.toString());//working example returning string
  //return String::New(env,val);

}
//void Init(Env env, Object exports, Object module) {
//  exports.Set("metadata", Function::New(env, metadata));
//}
Object Init(Env env, Object exports) {
  exports.Set(String::New(env,"metadata"), Function::New(env, metadata));
  return exports;
}
NODE_API_MODULE(addon, Init)