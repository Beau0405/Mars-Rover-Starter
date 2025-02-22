const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Message class", function() {
//test 4
    it("throws error if command name is NOT passed into constructor as the first parameter", function() {
        expect( function() { new Message();}).toThrow(new Error('Command type required.'));
      });
});
//test 5
    it("constructor sets name", function() {
        let message = new Message("New message");
        expect(message.name).toEqual("New message");
    });
// test 6
    it("contains a commands array passed into theconstructor as 2nd argument", function(){
        let commands = [new Command("STATUS_CHECK"), new Command("Move",10)]
        let message = new Message("test 2", commands);
        expect(message.commands).toEqual(commands);
    });


