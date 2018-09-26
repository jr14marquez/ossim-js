#include <napi.h>
#include "ossim-chipper.h"  // NOLINT(build/include)
#include <ossim/base/ossimConstants.h>
#include <ossim/base/ossimArgumentParser.h>
#include <ossim/base/ossimApplicationUsage.h>
#include <ossim/base/ossimException.h>
#include <ossim/base/ossimNotify.h>
#include <ossim/base/ossimRefPtr.h>
#include <ossim/base/ossimTimer.h>
#include <ossim/base/ossimTrace.h>
#include <ossim/init/ossimInit.h>
#include <ossim/util/ossimChipperUtil.h>

#include <cstdlib> /* for exit */
#include <iomanip>
#include <iostream>


using namespace Napi;
String Chipper(const CallbackInfo& info) {
  Env env = info.Env();

  std::string result = "success";

  std::vector<char*> argv;
  Array arr = info[0].As<Array>();
  for (int i = 0; i < arr.Length(); i++) {
    std::string str = arr.Get(i).As<String>().Utf8Value();
    argv.push_back((char*)strdup(str.c_str()));
  }
  argv.push_back(nullptr);

  ossimTimer timer;
  // Start the timer.
  ossimTimer::Timer_t tickStart = timer.tick();

  //---
  // Get the arg count so we can tell if an arg was consumed by
  // ossimInit::instance()->initialize
  //---
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
      // Make the generator.
      ossimRefPtr<ossimChipperUtil> chipper = new ossimChipperUtil;

      try
      {      
         //---
         // NOTE: ossimChipperUtil::initialize handles the application usage which will
         // false, to end things if certain options (e.g. "--help") are provided.
         //
         // ossimChipperUtil::initialize can throw an exception.
         //---
         bool continue_after_init = chipper->initialize(ap);
         if (continue_after_init)
         {      
            // ossimChipperUtil::execute can throw an excepion.
            chipper->execute();
            ossimTimer::Timer_t tickEnd = timer.tick();
          
            ossimNotify(ossimNotifyLevel_NOTICE)
               << "elapsed time in seconds: "
               << std::setiosflags(ios::fixed)
               << std::setprecision(3)
               << timer.delta_s(tickStart, tickEnd) << endl;
              result = "success";
         }
      }
      catch (const ossimException& e)
      {
         ossimNotify(ossimNotifyLevel_WARN) << e.what() << std::endl;
         result = "error";
         exit(1);
      }
      
   } // End: if ( ( ap.argc() > 1 ) ...

   exit(0);
   
  return String::New(env,result);//working example returning string
}