const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Rover class", function() {

  // 7 tests here!
  it("constructor sets position and default values for mode and generatorWatts", function() {
    let rover = new Rover(98382);
    expect(rover.position).toEqual(98382);
    expect(rover.mode).toEqual("NORMAL");
    expect(rover.generatorWatts).toEqual(110);
  });
// test 8
  it("response returned by receiveMessage contains name of message", function() {
   let commands = new Command("MOVE", 1000);
   let message = new Message("test", commands);
   let rover = new Rover(message.commands.value);
   let response = rover.receiveMessage(message);
   expect(response.message).toEqual("test");
  });
// test 9
  it("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    let commands = [new Command("MOVE", 1000), new Command("STATUS_CHECK")];
    let message = new Message("New Command", commands);
    let rover = new Rover(message.commands.value);
    let response = rover.receiveMessage(message);
    expect(response.results.length).toEqual(2);  
    });
// test 10
  it("responds correctly to status check command", function() {
    let commands = [new Command("STATUS_CHECK")];
    let message = new Message("New command", commands);
    let rover = new Rover(2000);
    let response = rover.receiveMessage(message);
    expect(response.results.roverStatus).toBeTrue;
    expect(response.results[0].roverStatus.mode).toEqual("NORMAL");
    expect(response.results[0].roverStatus.position).toEqual(2000);
    expect(response.results[0].roverStatus.generatorWatts).toEqual(110);
    
  });
// test 11
  it("responds correctly to mode change command", function() {
    let commands = [new Command ("MODE_CHANGE", "LOW_POWER")];
    let message = new Message("A new command!", commands);
    let rover = new Rover(message.commands.value);
    let response = rover.receiveMessage(message);
    expect(response.results[0].completed).toEqual("true");
    expect(rover.mode).toEqual("LOW_POWER");
    
  });
// test 12
  it("responds with false completed value when attempting to move in LOW_POWER mode", function() {
    let commands = [new Command ("MOVE", 800), new Command ("MODE_CHANGE", "LOW_POWER"), new Command("MOVE",500)];
    let message = new Message("New commands",commands);
    let rover = new Rover(message.commands.value);
    let response = rover.receiveMessage(message);
    expect(response.results[2].completed).toEqual("false");
    expect(rover.position).toEqual(800);
     
  });
// test 13
  it("responds with position for move command", function() {
    let commands = [new Command ("MOVE", 9000)];
    let message = new Message("New Position", commands);
    let rover = new Rover (message.commands.value);
    rover.receiveMessage(message);
    expect(rover.position).toEqual(9000);
   
  });

});







