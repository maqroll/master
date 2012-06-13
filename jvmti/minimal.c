//From jdk7
#include "jvmti.h"
#include <stdio.h>

JNIEXPORT jint JNICALL Agent_OnLoad(JavaVM *jvm, char *options, void *reserved) {
    printf("%s\n", "Hemos cargado el agente");
    /* We return JNI_OK to signify success */
    return JNI_OK;
}
