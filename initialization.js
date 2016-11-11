// File: initialization.js
// 
// Initializes local storage with the arrays holding classes and requirements
//


function init(){
        //COEN Requirement Arrays
        var COENArray = "COEN010:COEN010;"+
                        "COEN011:COEN011;"+
                        "COEN012:COEN012;"+
                        "COEN019:COEN019;"+
                        "COEN020:COEN020;"+
                        "COEN021:COEN021;"+
                        "COEN044:NULL;"+
                        "COEN045:NULL;"+
                        "COEN060:NULL;"+
                        "COEN070:COEN070;"+
                        "COEN120:COENELC;"+
                        "COEN122:COEN122;"+
                        "COEN123:COENELC;"+
                        "COEN129:COENELC;"+
                        "COEN146:COEN146;"+
                        "COEN148:COENELC;"+
                        "COEN152:COENELC;"+
                        "COEN160:COENELC;"+
                        "COEN161:COENELC;"+
                        "COEN162:COENELC;"+
                        "COEN163:COENELC;"+
                        "COEN164:COENELC;"+
                        "COEN165:COENELC;"+
                        "COEN166:COENELC;"+
                        "COEN169:COENELC;"+
                        "COEN171:COEN171;"+
                        "COEN174:COEN174;"+
                        "COEN175:COEN175;"+
                        "COEN177:COEN177;"+
                        "COEN178:COENELC;"+
                        "COEN179:COEN179;"+
                        "COEN180:COENELC;"+
                        "COEN188:NULL;"+
                        "COEN189:NULL;"+
                        "COEN191:NULL;"+
                        "COEN193:NULL;"+
                        "COEN194:COEN194,CIVE;"+
                        "COEN195:COEN195;"+
                        "COEN196:COEN196;"+
                        "COEN199:NULL;";

        var ENGRArray = "ENGR001:ENGR001;";

        var ELENArray = "ELEN050:ELEN050;"+
                        "ELEN115:COENELC;"+
                        "ELEN133:COENELC;"+
                        "ELEN134:COENELC;"+
                        "ELEN153:ELEN153;"+
                        "ELEN160:RTC3;";
        
        var ENGLArray = "ENGL001:CTW12;"+
                        "ENGL002:CTW12;"+
                        "ENGL039:DIV;"+
                        "ENGL181:ENGL181,ADVW;";

        var MATHArray = "MATH011:MATH011;"+
                        "MATH012:MATH012;"+
                        "MATH013:MATH013;"+
                        "MATH014:MATH014;"+
                        "MATH022:AMTH106;"+
                        "MATH053:MATH053;"+
                        "MATH122:AMTH108;"+
                        "MATH166:MATH053;";

        var PHYSArray = "PHYS031:PHYS031;"+
                        "PHYS032:PHYS032;"+
                        "PHYS033:PHYS033;"+
                        "PHYS034:NSCI;";

        var CHEMArray = "CHEM011:NSCI;"+
                        "CHEM012:AMTH106;";

        var AMTHArray = "AMTH106:AMTH106;"+
                        "AMTH108:AMTH108;"+
                        "AMTH118:MATH053;";

        //Core Requirement Arrays

        var RSOCArray = "RSOC009:RTC1;"+
                        "RSOC099:RTC2,ELSJ;"+
                        "RSOC139:RTC3;";

        var SCTRArray = "SCTR015:RTC1;"+
                        "SCTR031:RTC2;";

        var TESPArray = "TESP002:RTC1;"+
                        "TESP088:RTC2;"+
                        "TESP119:RTC3;";

        var PHILArray = "PHIL001:CTW12;"+
                        "PHIL002:CTW12;"+
                        "PHIL111:ETHC;";

        var HISTArray = "HIST011:C&I12;"+
                        "HIST012:C&I12;"+
                        "HIST128:CIVE;";

        var ARTHArray = "ARTH011:C&I12;"+
                        "ARTH012:C&I12;";

        var POLIArray = "POLI002:C&I3,SSCI;";

        var WGSTArray = "WGST058:ETHC;";

        var ELSJArray = "ELSJ050:CIVE;";

        var ETHNArray = "ETHN005:DIV;";

        var BIOLArray = "BIOL018:NSCI;";

        var PSYCArray = "PSYC001:SSCI;";


        var allList =   ENGRArray+
                        COENArray+
                        ELENArray+
                        ENGLArray+
                        MATHArray+
                        PHYSArray+
                        CHEMArray+
                        AMTHArray+
                        RSOCArray+
                        SCTRArray+
                        TESPArray+
                        PHILArray+
                        HISTArray+
                        ARTHArray+
                        POLIArray+
                        WGSTArray+
                        ELSJArray+
                        ETHNArray+
                        ENGRArray+
                        BIOLArray+
                        PSYCArray;

        localStorage.setItem("classList",allList);

        // Check if other list and future list exist, and create if not
        if(localStorage.getItem("otherList") == null){
                localStorage.setItem("otherList","");
        }
        if(localStorage.getItem("futureList") == null){
                localStorage.setItem("futureList","");
        }

}

function makeMap(){
        var classMap = new Map();
        var classList = localStorage.getItem("classList");
        classList = classList.split(';');
        var i;
        classList.forEach(function(value, index){
                var elem = classList[index].split(':');
                classMap.set(elem[0],elem[1]);
        });
        return classMap;
}



