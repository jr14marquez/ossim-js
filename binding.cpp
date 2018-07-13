#include <napi.h>
#include <ossimInfo.h>
#include <iostream>
#include <ostream>

using namespace Napi;
String info(const CallbackInfo& info) {
  Env env = info.Env();

  napi_status status;
  size_t argc = 2;
  napi_value argv[2];
  status = napi_get_cb_info(env, info, &argc, argv, nullptr, nullptr);
    
  if(status != napi_ok) {
      napi_throw_error(env, NULL, "Failed to parse arguments");
  }

  if(info.Length() < 2 || !info[0].IsObject()) {
    Napi::TypeError::New(env, "Wrong number of args or second arg is not object.").ThrowAsJavaScriptException();
  } 
  std::string filename = info[0].As<String>().Utf8Value();
  //const filename = "/home/rmarquez/Downloads/images/17MAR20054817-P1BS-056599362010_01_P004.NTF";
  Object obj = info[1].As<Object>();
  Value val1 = obj.Get("dumpFlag");
  ossimKeywordlist kwl;

  
           
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
  exports.Set(String::New(env,"info"), Function::New(env, info));
  return exports;
}
NODE_API_MODULE(addon, Init)