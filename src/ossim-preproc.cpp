#include <napi.h>
#include "ossim-preproc.h"  // NOLINT(build/include)
#include <ossim/base/ossimArgumentParser.h>
#include <ossim/base/ossimException.h>
#include <ossim/base/ossimNotify.h>
#include <ossim/base/ossimRefPtr.h>
#include <ossim/base/ossimTimer.h>
#include <ossim/init/ossimInit.h>
#include <ossim/util/ossimImageUtil.h>

using namespace Napi;
Number Preproc(const CallbackInfo& info) {
  Env env = info.Env();

  // Example
  // A single image with j2k overviews(requires kakadu plugin), histogram:
  // ossim-preproc --ot ossim_kakadu_nitf_j2k --ch <file>
  // std::string arguments[] = {"ossim-preproc","--ot", "ossim_kakadu_nitf_j2k","--ch","/home/rmarquez/Downloads/images/17MAR20054817-P1BS-056599362010_01_P004.NTF"};
  // for (const auto& arg : arguments)
  //    argv.push_back((char*)arg.data());
  // argv.push_back(nullptr);

  std::vector<char*> argv;
  Array arr = info[0].As<Array>();
  for (int i = 0; i < arr.Length(); i++) {
    std::string str = arr.Get(i).As<String>().Utf8Value();
    argv.push_back((char*)strdup(str.c_str()));
  }
  argv.push_back(nullptr);

  // Return 0 on success, something else on error.
   enum
   {
      OK    = 0,
      ERROR = 1
   };
   
   int result = OK;
   
   // Start the timer.
   ossimTimer::instance()->setStartTick();

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
      // Make the info object.
      ossimRefPtr<ossimImageUtil> oiu = new ossimImageUtil();
      
      try
      {
         //---
         // Initialize will take the options passed in and set things to output
         // information for.
         //
         // ossimInfo::initialize can throw an exception.
         //---
         bool continue_after_init = oiu->initialize(ap);
         
         if ( continue_after_init )
         {
            // Execute the operation(s).
            result = oiu->execute();

            ossimNotify(ossimNotifyLevel_NOTICE)
               << "elapsed time in seconds: "
               << std::setiosflags(ios::fixed)
               << std::setprecision(3)
               << ossimTimer::instance()->time_s() << endl;
         }
      }
      catch (const ossimException& e)
      {
         ossimNotify(ossimNotifyLevel_WARN) << e.what() << std::endl;
         result = ERROR;
      }
      
   }  // End: if ( ( ap.argc() > 1 ) ...
   
  return Number::New(env,result);//working example returning string
}