cmake_minimum_required(VERSION 2.8)
project (ossim)
#unset(CMAKE_C_IMPLICIT_INCLUDE_DIRECTORIES)
#unset(CMAKE_CXX_IMPLICIT_INCLUDE_DIRECTORIES)

set(CMAKE_MODULE_PATH ${CMAKE_MODULE_PATH} "/usr/share/ossim/CMakeModules")

include_directories(${CMAKE_JS_INC})

find_package( ossim REQUIRED)
if( OSSIM_FOUND )
    include_directories( ${OSSIM_INCLUDE_DIR} )
else( OSSIM_FOUND )
   message( FATAL_ERROR "Could not find required OSSIM package!" )
endif( OSSIM_FOUND )

find_package( JsonCpp )
if( JSONCPP_FOUND )
   include_directories( ${JSONCPP_INCLUDE_DIR} )
   message("Found JsonCpp" )
else( JSONCPP_FOUND )
   message( FATAL_ERROR "Could not find required JsonCpp package!" )
endif( JSONCPP_FOUND )

# Declare the source files location
file(GLOB SOURCE_FILES "./*.cpp")

# This line will tell CMake that we're building a shared library
# from the above source files
# named after the project's name
add_library(${PROJECT_NAME} SHARED ${SOURCE_FILES})

# This line will give our library file a .node extension 
# without any "lib" prefix
set_target_properties(${PROJECT_NAME} PROPERTIES PREFIX "" SUFFIX ".node")

# Include N-API wrappers
target_include_directories(${PROJECT_NAME} PRIVATE "${CMAKE_SOURCE_DIR}/node_modules/node-addon-api")

# Essential library files to link to a node addon,
# you should add this line in every CMake.js based project.
target_link_libraries(${PROJECT_NAME} ${CMAKE_JS_LIB} ${OSSIM_LIBRARIES})