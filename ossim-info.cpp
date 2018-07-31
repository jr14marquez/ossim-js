#include <napi.h>
#include <ossim/util/ossimInfo.h>
#include "ossim-info.h"  // NOLINT(build/include)
#include <iostream>
#include <ostream>

using namespace Napi;
String Info(const CallbackInfo& info) {
  Env env = info.Env();

  if(info.Length() < 1 || !info[1].IsObject()) {
    Napi::TypeError::New(env, "Wrong number of args or second arg is not object.").ThrowAsJavaScriptException();
  } 

  std::string filename = info[0].As<String>().Utf8Value();
  Object obj = info[1].As<Object>();
  ossimKeywordlist kwl;

  // Make the info object.
  ossimInfo* oi = new ossimInfo();

   // Pass options in:
  ossimTool* ot = dynamic_cast<ossimTool*>(oi);
  if ( ot )
  {
    ot->initialize( kwl );
  }
  
  /** From ossim/util/ossimInfo.h
    *
    * @brief getImageInfo Method to open image "file" and get image info
    * in the form of a ossimKeywordlist.
    *
    * Flags turn on various pieces of info.  These equate to options in
    * ossim-info for image information.
    *
    * @param file Image file to get information for.
    * @param dumpFlag      ossim-info -d
    * @param dnoFlag       ossim-info --dno
    * @param imageGeomFlag ossim-info -p
    * @param imageInfoFlag ossim-info -i 
    * @param metaDataFlag  ossim-info -m 
    * @param paletteFlag   ossim-info --palette
    * @param kwl Initialized by this method.
    */
  bool dumpFlag = obj.Get("dumpFlag").As<Boolean>();
  bool dnoFlag = obj.Get("dnoFlag").As<Boolean>();
  bool imageGeomFlag = obj.Get("imageGeomFlag").As<Boolean>();
  bool imageInfoFlag = obj.Get("imageInfoFlag").As<Boolean>();
  bool metaDataFlag = obj.Get("metaDataFlag").As<Boolean>();
  bool paletteFlag = obj.Get("paletteFlag").As<Boolean>();

  oi->getImageInfo( filename, dumpFlag, dnoFlag, imageGeomFlag, imageInfoFlag, metaDataFlag, paletteFlag, kwl );
  
  std::stringstream out;
  const std::string rootTag="info";
  kwl.toJSON(out,rootTag);

  return String::New(env,out.str());//working example returning string
}