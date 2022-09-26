#include <stdio.h>
#include <string.h>
#include <wiringPi.h>

#define HIGH 1
#define LOW 0
#define UP_PIN 17
#define DOWN_PIN 27

const char* upAction = "up";
const char* downAction = "down";
const char* stopAction = "stop";

// Compile: gcc command_driver.c -o command_driver.exe -lwiringPi
int main(int argc, char** args) {
    if(argc != 2) {
        printf("Usage: command_driver.exe [up | down | stop]");
        return -1;
    }

    // Initialize WiringPi with Broadcom GPIO pinB
    wiringPiSetupGpio();

    pinMode(UP_PIN, OUTPUT);
    pinMode(DOWN_PIN, OUTPUT);

    // Handle the incoming command
    if(strcmp(args[1], upAction) == 0) {
        digitalWrite(DOWN_PIN, LOW);
        digitalWrite(UP_PIN, HIGH);
    } else if(strcmp(args[1], downAction) == 0) {
        digitalWrite(UP_PIN, LOW);
        digitalWrite(DOWN_PIN, HIGH);
    } else if(strcmp(args[1], stopAction) == 0) {
        digitalWrite(DOWN_PIN, LOW);
        digitalWrite(UP_PIN, LOW);
    } else {
        printf("Usage: command_driver.exe [up | down | stop]");
        return -1;
    }

    return 0;
}
