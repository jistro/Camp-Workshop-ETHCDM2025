// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {PropiedadIntelectual} from "../src/PropiedadIntelectual.sol";

contract CounterScript is Script {
    PropiedadIntelectual public contrato;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        contrato = new PropiedadIntelectual();

        vm.stopBroadcast();
    }
}
