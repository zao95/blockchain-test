// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MyContract {

    string public storedData;

    event myEventTest(string eventOutput);

    function set(string memory myText) public {
        storedData = myText;
        emit myEventTest(myText);
    }

    function get() public view returns (string memory) {
        return storedData;
    }
}