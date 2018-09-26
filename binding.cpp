#include <napi.h>
#include "src/ossim-info.h"   // NOLINT(build/include)
#include "src/ossim-preproc.h"   // NOLINT(build/include)
#include "src/ossim-chipper.h"   // NOLINT(build/include)

// Expose access to each function
using namespace Napi;
Object Init(Env env, Object exports) {
  exports.Set(String::New(env, "info"), Function::New(env, Info));
  exports.Set(String::New(env, "preproc"), Function::New(env, Preproc));
  exports.Set(String::New(env, "chipper"), Function::New(env, Chipper));
  return exports;
}

NODE_API_MODULE(addon, Init) //original
//NODE_API_MODULE(NODE_GYP_MODULE_NAME, Init)



