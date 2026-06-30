{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = with pkgs; [
    nodejs_26
    yarn
    prettier
  ];

  shellHook = ''
    export NODE_ENV=development
  '';
}
