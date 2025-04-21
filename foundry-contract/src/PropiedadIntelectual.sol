// SPDX-License-Identifier: MIT
// Identificador de licencia MIT (permite uso libre con ciertas condiciones)

// Especificamos la versión del compilador de Solidity a usar
pragma solidity ^0.8.22;

// Importamos el estándar ERC721 de OpenZeppelin para NFTs
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";

// Contrato principal que hereda de ERC721 (NFT estándar)
contract PropiedadIntelectual is ERC721 {
    // Contador para asignar IDs únicos a cada token
    uint256 private _nextTokenId;

    // Estructura para almacenar los metadatos de una propiedad intelectual
    struct IPMetadata {
        string nombrePropiedadIntelectual; // Nombre de la propiedad (ej: "Investigacion sobre...")
        address propietario; // Dirección del dueño (wallet)
        bytes hashContenido; // Huella digital única del contenido (como una firma digital)
        uint256 fechaRegistro; // Fecha de registro (unix timestamp en segundos)
        address[] colaboradores; // Lista de colaboradores/coautores de la propiedad
        uint32 tipoPI; // Tipo de propiedad
        uint8 estado; // Estado actual (0: Inactivo , 1: Activo)
    }

    // Mapeo que relaciona cada ID de token con sus metadatos
    // (Como un diccionario donde cada número lleva a su información)
    mapping(uint256 id => IPMetadata info) propiedadesIntelectuales;

    // Constructor: Función que se ejecuta al desplegar el contrato
    constructor() ERC721("PropiedadIntelectual", "IP") {
        // Inicializa el contrato ERC721 con nombre "PropiedadIntelectual" y símbolo "IP"
        // (Como cuando creas una nueva moneda con su nombre y símbolo)
    }

    // Función que define la URL base para los metadatos de los tokens
    function _baseURI() internal pure override returns (string memory) {
        return "https://pagina.com/img/";
        // URL donde se almacenan imágenes/metadatos
        // cuando usamos la funcion tokenURI devolvera la concatenacion de la _baseURI y el tokenId
        // ejemplo: https://pagina.com/img/1
    }

    // Función para registrar una nueva propiedad intelectual
    function crearPropiedadIntelectual(
        string memory _nombrePropiedadIntelectual, // Nombre de la propiedad
        bytes memory _hashContenido, // Huella digital del contenido
        address[] memory _colaboradores, // Lista de colaboradores
        uint32 _tipoPI // Tipo de propiedad
    ) public returns (uint256 tokenId) {
        // Almacenamos los datos en la estructura IPMetadata
        propiedadesIntelectuales[_nextTokenId] = IPMetadata({
            nombrePropiedadIntelectual: _nombrePropiedadIntelectual,
            propietario: msg.sender, // msg.sender es quien llama a la función (dueño)
            hashContenido: _hashContenido,
            fechaRegistro: block.timestamp,
            colaboradores: _colaboradores,
            tipoPI: _tipoPI,
            estado: 1 // 1 = Activo por defecto
        });

        // Creamos (acuñamos) un nuevo token NFT para el dueño
        tokenId = safeMint(msg.sender);
    }

    // Función interna para crear un nuevo token NFT
    function safeMint(address to) internal returns (uint256) {
        uint256 tokenId = _nextTokenId++; // Asignamos y aumentamos el contador de IDs
        _safeMint(to, tokenId); // Función heredada que crea el token seguro
        return tokenId;
    }

    // Función para consultar los datos de una propiedad intelectual
    function getPropiedadIntelectual(
        uint256 tokenId
    ) public view returns (IPMetadata memory) {
        // Devuelve toda la información asociada a un token ID
        return propiedadesIntelectuales[tokenId];
    }

    // Función para consultar el dueño de una propiedad intelectual
    function getOwnerPropiedadIntelectual(
        uint256 tokenId
    ) public view returns (address) {
        // Devuelve la dirección del propietario del token
        return propiedadesIntelectuales[tokenId].propietario;
    }
}
