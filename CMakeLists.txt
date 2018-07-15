project (ossimjs)
include_directories(${CMAKE_JS_INC})


# Declare the source files location
file(GLOB SOURCE_FILES "./*.cpp")

set(CMAKE_MODULE_PATH ${CMAKE_MODULE_PATH} "/usr/local/share/ossim/CMakeModules")
SET(OSSIM_LIBRARY "ossim" CACHE STRING "Caching" FORCE)


INCLUDE(OssimVersion)
INCLUDE(OssimUtilities)
INCLUDE(OssimCommonVariables)

find_package(ossim)


if(ossim_FOUND)
	MESSAGE( STATUS "FOUND OSSIM!!!!!!!!")
    include_directories(${ossim_INCLUDE_DIR})
    target_link_libraries(${PROJECT_NAME} ${ossim_LIBS})
endif( ossim_FOUND )

find_package( JsonCpp )
if( JSONCPP_FOUND )
   include_directories( ${JSONCPP_INCLUDE_DIR} )
   set( requiredLibs ${requiredLibs} ${JSONCPP_LIBRARY} )
   message("Found JsonCpp" )
else( JSONCPP_FOUND )
   message( FATAL_ERROR "Could not find required JsonCpp package!" )
endif( JSONCPP_FOUND )

MESSAGE( STATUS "OSSIM_INCLUDE_DIR=${OSSIM_INCLUDE_DIR}")
MESSAGE( STATUS "OSSIM_LIBRARIES =${OSSIM_LIBRARIES}")


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
target_link_libraries(${PROJECT_NAME} ${CMAKE_JS_LIB})