// Name: Ani Frankpeter Ikechukwu 

const prompt = require('prompt-sync')({sigint: true});

let Lycan = function(){
    //private static attribute
     const activityMap = [
        {'fighting': 3},
        {'crossbreeding': 3},
        {'mating': 7},
        {'growling': 4},
        {'sleeping': 5},
    ]

    let dailyActivity = []

    return function(name){
        //instance property
        this.name = name

        //instance methods 
        this.showActivityMap = ()=>{
            const result =  activityMap.map(act => {
                return Object.keys(act)
            })
            return result
        }

        this.addActivity = (activity)=>{
            //loop throw the entire activity map and find a match
            let validAct = activityMap.filter(act=>{
                return Object.keys(act) == activity 
            })
            if(validAct.length > 0){
                dailyActivity.push(activity)
                //check if it's a Lycanthrope yet 
                this.isLycanthrope()
            }else{
                throw new Error(`${activity} is Not a valid activity`)
            }
        }

        this.showCurrentActivity = ()=>{
            return dailyActivity
        }

        this.totalActivityScore = () => {
            let totalScore = 0
            dailyActivity.forEach(act => {
                activityMap.forEach(activityMapAct => {
                    if(activityMapAct[act] !== undefined){
                        totalScore += activityMapAct[act]
                    }
                })
            })
            return Math.ceil(totalScore)
        }
        
        this.isLycanthrope = () => {
            const totalScore = this.totalActivityScore();
            if(totalScore < 70){
                return ("didn't turn to a  Lycan :(");
            }else{
                return ("turned to a Lycan :)")
            }
        }
    }
    
    
}
let newLycan = new Lycan()
const LycanName = prompt("Please enter your Lycan's identifier: ");
const yourLycan = new newLycan(`${LycanName}`)
prompt(`::In the next prompt please manually input the different things your Lycan did during the day up until 2 weeks. Your Lycan can perform some of the following: 
${yourLycan.showActivityMap()}. Press Enter to continue the program`)
function get14DaysAction(){
    for(let i = 1; i < 15; i ++){
        try{
            const LycanAction = prompt(`What did ${LycanName} do on day ${i}? `)
            yourLycan.addActivity(LycanAction);
        }catch(err){
            console.log(`::An error occurred: ${err.message}`)
            const LycanAction = prompt(`What did ${LycanName} do on day ${i}? `)
            yourLycan.addActivity(LycanAction);
        }
    }
}
get14DaysAction()
prompt(`::We are all itching to know if ${LycanName} turned, let's find out in a second `)
console.log(`${LycanName} ${yourLycan.isLycanthrope()}`)
console.log(`${LycanName}'s score was ${yourLycan.totalActivityScore()}`)
