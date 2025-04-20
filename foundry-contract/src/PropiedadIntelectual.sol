// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.22;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract PropiedadIntelectual is ERC721, Ownable {
    uint256 private _nextTokenId;

    struct IPMetadata {
        string nombrePropiedadIntelectual;
        address propietario;
        bytes hashContenido;
        uint256 fechaRegistro;
        address[] colaboradores;
        uint32 tipoPI;
        uint8 estado;
    }

    mapping(uint256 id => IPMetadata info) propiedadesIntelectuales;

    constructor(
        address initialOwner
    ) ERC721("MyToken", "MTK") Ownable(initialOwner) {}

    function _baseURI() internal pure override returns (string memory) {
        return "https://pagina.com/img/";
    }

    function crearPropiedadIntelectual(
        string memory _nombrePropiedadIntelectual,
        bytes memory _hashContenido,
        uint256 _fechaRegistro,
        address[] memory _colaboradores,
        uint32 _tipoPI
    ) public returns (uint256 tokenId) {
        propiedadesIntelectuales[_nextTokenId] = IPMetadata({
            nombrePropiedadIntelectual: _nombrePropiedadIntelectual,
            propietario: msg.sender,
            hashContenido: _hashContenido,
            fechaRegistro: _fechaRegistro,
            colaboradores: _colaboradores,
            tipoPI: _tipoPI,
            estado: 0
        });
        tokenId = safeMint(msg.sender);
    }

    function safeMint(address to) internal returns (uint256) {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        return tokenId;
    }

    function getPropiedadIntelectual(
        uint256 tokenId
    ) public view returns (IPMetadata memory) {
        return propiedadesIntelectuales[tokenId];
    }

    function getOwnerPropiedadIntelectual(
        uint256 tokenId
    ) public view returns (address) {
        return propiedadesIntelectuales[tokenId].propietario;
    }
}
