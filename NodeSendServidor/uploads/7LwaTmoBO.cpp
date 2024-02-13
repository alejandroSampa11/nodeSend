#include <iostream>

using namespace std;

#include "conversor.h"


int main() {
    int n =100;
    //int *binario = new int[32];
    int binario[32]; //ARREGLO ESTATICO
    for(int i =0;i<32;i++){
        binario[i]=0;
    }
    cout<<"opcion recursiva 1"<<endl;
    Conversor miConversor;
    miConversor.convDecBinR(n, binario, );
    for (int i = 0; i < 32; i++) {
        printf("%d,",&binario[i]);
    }
    cout<<"opcion recursiva 2"<<endl;
    miConversor.convDecBinR(n, binario);
    for (int i = 0; i < 32; i++) {
        printf("%d,",&binario[i]);
    }
    return 0;
}

/*
void convDecBin(int n, int *bin){
    int i = 32;
    while(n>0){
        bin[i--] = n%2;
        n/=2;
    }
}

    void convDecBinR(int n, int *bin,int i){
        //LAS VARIABLES QUE TIENE EL MODIFICADOR
        //STATIC, MANTIENEN SU VALOR EN SUCESIVAS LLAMDAS AL METODO
        //static int i = 0;
        if(n>0){
            bin[i++] = n%2;
            convDecBinR(n/2, bin,i);
        }
    }

    void convDecBinR(int n, int *bin){
        //LAS VARIABLES QUE TIENE EL MODIFICADOR
        //STATIC, MANTIENEN SU VALOR EN SUCESIVAS LLAMDAS AL METODO
        static int i = 0;
        if(n>0){
            bin[i++] = n%2;
            convDecBinR(n/2, bin,i);
        }
    }
*/

