{ pkgs ? import <nixpkgs> { } }:
pkgs.mkShell rec {
  buildInputs = with pkgs; [ nodejs-10_x python3 poetry yarn ];
  
  PROJECT_PATH = toString ./.;
  PYTHONPATH = "$PYTHONPATH:${PROJECT_PATH}/packages";
}
