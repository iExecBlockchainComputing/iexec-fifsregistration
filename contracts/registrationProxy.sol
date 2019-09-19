pragma solidity ^0.5.0;

import "@ensdomains/ens/contracts/ENS.sol";
import "@ensdomains/ens/contracts/FIFSRegistrar.sol";
import "@ensdomains/resolver/contracts/Resolver.sol";

contract RegistrationProxy
{
	function registerENS(
		ENS      ens,
		Resolver resolver,
		bytes32  domain,
		bytes32  label,
		address  addr)
	external
	{
		// compute nodeHash
		bytes32 node = keccak256(abi.encode(domain, label));
		// get FIFSRegistrar for this domain
		FIFSRegistrar fifs = FIFSRegistrar(ens.owner(domain));
		// register new label
		fifs.register(label, address(this));
		// setup node & give ownership
		ens.setResolver(node, address(resolver));
		resolver.setAddr(node, addr);
		ens.setOwner(node, addr);
	}
}
