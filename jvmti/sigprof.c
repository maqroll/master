//From jdk7
#include "jvmti.h"
#include "jvmpi.h"
#include <stdio.h>
#include <signal.h>
#include <sys/time.h>
#include <ucontext.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include "sigprof.h"

extern void AsyncGetCallTrace(JVMPI_CallTrace *trace, jint depth, void* ucontext) __attribute__ ((weak));

static JavaVM *my_jvm;

static pthread_key_t jniTLKey;

void handler(int signal, siginfo_t *sigInfo, void *ctx) {
    ucontext_t* currentContext = (ucontext_t*) ctx;
    char adios[]="AsyncGetCallTrace isn't available\n";
    char ok[]="ok\n";

    if (AsyncGetCallTrace)
    {
        JVMPI_CallTrace trace; 
        JNIEnv *env; 
        //(*my_jvm)->AttachCurrentThread(my_jvm,(void **) &env, NULL); 
        //trace.env_id = env; 
        trace.env_id = (JNIEnv*)pthread_getspecific(jniTLKey);
        trace.num_frames = 0; 
        JVMPI_CallFrame storage[25]; 
        trace.frames = (JVMPI_CallFrame*)storage;

        AsyncGetCallTrace(&trace, 25, currentContext);
        
        if(trace.num_frames < 0)
        {
            return;
        }
       
        char buffer[]="                      \n";
        my_itoa(trace.num_frames,buffer);
        write(1,buffer,strlen(buffer)+1);
        write(1,"\n",2);
    } else
    {
        write(1, adios, strlen(adios)+1);
        exit(1);
    }
}

void JNICALL OnClassLoad(jvmtiEnv *jvmti_env,
                        JNIEnv* jni_env,
                        jthread thread,
                        jclass klass) {
}

void JNICALL OnClassPrepare(jvmtiEnv *jvmti, JNIEnv* jni_env, jthread thread, jclass klass) {
  jint methodCount;
  jmethodID *methods;
  (*jvmti)->GetClassMethods(jvmti,klass, &methodCount, &methods);
  (*jvmti)->Deallocate(jvmti,(unsigned char*) methods);
}

void JNICALL OnThreadStart(jvmtiEnv *jvmti_env, JNIEnv* jni_env, jthread thread) {
  pthread_setspecific(jniTLKey, jni_env);
}

JNIEXPORT jint JNICALL Agent_OnLoad(JavaVM *jvm, char *options, void *reserved) {
    printf("%s\n", "Cargando el agente");

    //TODO todas estas llamadas devuelven códigos de error que no se estan 
    //      procesando
    jvmtiEnv *jvmti;
    (*jvm)->GetEnv(jvm, (void **)&jvmti, JVMTI_VERSION);

    jvmtiEventCallbacks callbacks;
    memset(&callbacks, 0, sizeof(callbacks));
    callbacks.ClassLoad = &OnClassLoad;
    callbacks.ClassPrepare = &OnClassPrepare;
    callbacks.ThreadStart = &OnThreadStart;

    (*jvmti)->SetEventCallbacks(jvmti, &callbacks, sizeof(callbacks));
    (*jvmti)->SetEventNotificationMode(jvmti,JVMTI_ENABLE, JVMTI_EVENT_CLASS_LOAD, NULL);
    (*jvmti)->SetEventNotificationMode(jvmti,JVMTI_ENABLE, JVMTI_EVENT_CLASS_PREPARE, NULL);
    (*jvmti)->SetEventNotificationMode(jvmti,JVMTI_ENABLE, JVMTI_EVENT_THREAD_START, NULL);

    jvmtiCapabilities caps;
    memset((void*) &caps, 0, sizeof(jvmtiCapabilities));
    caps.can_get_source_file_name = 1;
    caps.can_get_line_numbers = 1;
    caps.can_generate_compiled_method_load_events = 1;

    (*jvmti)->AddCapabilities(jvmti,&caps);

    my_jvm = jvm; 

    struct sigaction sa;
    memset(&sa, 0, sizeof(sa));
    sa.sa_sigaction = &handler;
    sa.sa_flags = SA_RESTART | SA_SIGINFO;
    sigemptyset(&sa.sa_mask);  // Oh, just look it up.
    struct sigaction old_handler;
    sigaction(SIGPROF, &sa, &old_handler);

    static struct itimerval timer;
    timer.it_interval.tv_sec = 5;  // number of seconds is obviously up to you
    timer.it_interval.tv_usec = 0;  // as is number of microseconds.
    timer.it_value = timer.it_interval;
    setitimer(ITIMER_PROF, &timer, NULL);

    pthread_key_create(&jniTLKey, NULL);

    printf("%s\n", "Hemos cargado el agente");
    /* We return JNI_OK to signify success */
    return JNI_OK;
}
