// The provided course information.
const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript"
};

// The provided assignment group.
const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
  {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50
  },
  {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150
  },
  {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500
  }
  ]
};

// The provided learner submission data.
const LearnerSubmissions = [
  {
  learner_id: 125,
  assignment_id: 1,
  submission: {
      submitted_at: "2023-01-25",
      score: 47
  }
  },
  {
  learner_id: 125,
  assignment_id: 2,
  submission: {
      submitted_at: "2023-02-12",
      score: 150
  }
  },
  {
  learner_id: 125,
  assignment_id: 3,
  submission: {
      submitted_at: "2023-01-25",
      score: 400
  }
  },
  {
  learner_id: 132,
  assignment_id: 1,
  submission: {
      submitted_at: "2023-01-24",
      score: 39
  }
  },
  {
  learner_id: 132,
  assignment_id: 2,
  submission: {
      submitted_at: "2023-03-07",
      score: 140
  }
  }
];

// function to check whether AssignmentGroup does not belong to its course 
function isValidCourse(CourseInfo, AssignmentGroup) {
if(CourseInfo.id === AssignmentGroup.course_id){return true} 
}

// getLearnerData function starts 
function getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions) {

const result = []; 
let assignment_Scores = [];
const assignments_lists = AssignmentGroup.assignments;
const learnerData = {};

// If an AssignmentGroup does not belong to its course (mismatching course_id), your program should throw an error, letting the user know that the input was invalid. Similar data validation should occur elsewhere within the program.

let isValid = isValidCourse(CourseInfo, AssignmentGroup)
//console.log(isValid);


//error handeling if assignment not belong to course
if (!isValid) {
    throw new Error("Invalid input: Assignment is not available in this course.");
}

// looping through learnersSubmisions to areate learnersData array and calculate average
for(const eachSubmission of LearnerSubmissions) {  

    const learnerID = eachSubmission.learner_id;  //assigning value of learners ID
    const assignmentID = eachSubmission.assignment_id;  //assigning value of assignment ID
    const assignmentData = assignments_lists.find((assignment_details) => assignment_details.id === assignmentID);  //getting assignment details from assignment list with id

    //check if assignment submission date is later that assignment due date
    if (new Date(eachSubmission.submission.submitted_at) > new Date(assignmentData.due_at)) {
      continue;
    }

    try{
      //You should also account for potential errors in the data that your program receives. What if points_possible is 0? You cannot divide by zero. What if a value that you are expecting to be a number is instead a string? 
      if (!(assignmentData.points_possible === 0 && typeof(eachSubmission.submission.score) !== "number")) {
        learnerData[learnerID] = {
              id: learnerID,
              totalScore: 0,
              totalWeight: 0,
        }

        // Assigning value to variables
          const pointsScore = eachSubmission.submission.score;
          const totalPointsPossible = assignmentData.points_possible;  

          
          // creating array to push marks according to assignmentsID's
          assignment_Scores.push ( {
            id : learnerID,
            assignment_id : assignmentID ,
            marks : ((eachSubmission.submission.score/assignmentData.points_possible)+" (" +eachSubmission.submission.score + " / "+ assignmentData.points_possible + ")")
          } )
          
          //Calculate total score and average
          learnerData[learnerID].totalScore += pointsScore;
          learnerData[learnerID].totalWeight += totalPointsPossible;
          learnerData[learnerID].average = (pointsScore/totalPointsPossible)*100; 
    

        }
    }catch(error){
      console.log(error);
    }
}   


for (const learnerID in learnerData) {

    
    let result1
    result1 = assignment_Scores.reduce(function(r, a) {
      r[a.id] = r[a.id] || [];
      r[a.id].push(a.marks);
      return r;
    }, Object.create(null));

    
    
    const learnerResult = {
      avg: learnerData[learnerID].average,
      id: learnerID,
    };  

    for (let assignmentID in result1[learnerID]) {
      let assignmentID1 = parseInt(assignmentID)+1;
      learnerResult[assignmentID1] = result1[learnerID][assignmentID];
    }

    result.push(learnerResult);
}

return result;
}

const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
console.log( result);

result.forEach(element => {
  console.log("Details of student Id : " +element.id);
  console.log(element)
});






//
