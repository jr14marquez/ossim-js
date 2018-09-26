#include <napi.h>
#include <ossim/util/ossimInfo.h>
#include "ossim-info.h"  // NOLINT(build/include)
#include <ossim/util/ossimTool.h>
#include <ossim/base/ossimArgumentParser.h>
#include <ossim/base/ossimException.h>
#include <ossim/base/ossimNotify.h>
#include <ossim/base/ossimRefPtr.h>
#include <ossim/base/ossimTimer.h>
#include <ossim/init/ossimInit.h>
#include <ossim/util/ossimImageUtil.h>
#include <iostream>
#include <ostream>

using namespace Napi;
String Info(const CallbackInfo& info) {
  Env env = info.Env();

  std::string out = "success";
  std::stringstream res;
  std::ostream* os;
  std::ostringstream my_stream;
  ossimSetNotifyStream(&my_stream, ossimNotifyFlags_INFO);

  std::vector<char*> argv;
  Array arr = info[0].As<Array>();
  for (int i = 0; i < arr.Length(); i++) {
    std::string str = arr.Get(i).As<String>().Utf8Value();
    argv.push_back((char*)strdup(str.c_str()));
  }
  argv.push_back(nullptr);

  int originalArgCount = argv.size() - 1;
  int argc = argv.size() - 1;

  ossimArgumentParser ap(&argc, argv.data());

  // Initialize ossim stuff, factories, plugin, etc.
  ossimInit::instance()->initialize(ap);

  //---
   // Avoid going on if a global option was consumed by ossimInit::initialize
   // like -V or --version option and the arg count is down to 1.
   //---
   if ( ( ap.argc() > 1 ) || ( ap.argc() == originalArgCount ) )
   {
          // Make the info object.
      ossimInfo* oi = new ossimInfo();

       // Pass options in:
      ossimTool* ot = dynamic_cast<ossimTool*>(oi);
      if ( ot )
      {
        try
        {
           //---
           // Initialize will take the options passed in and set things to output
           // information for.
           //
           // ossimInfo::initialize can throw an exception.
           //---
           bool continue_after_init = ot->initialize(ap);

           if ( continue_after_init )
           {
              ot->execute();
              out = my_stream.str();
           }
        }
        catch (const ossimException& e)
        {
           ossimNotify(ossimNotifyLevel_WARN) << e.what() << std::endl;
           out = "error";
        }
      } 
   }  // End: if ( ( ap.argc() > 1 ) ...

  return String::New(env,out);//working example returning string
}