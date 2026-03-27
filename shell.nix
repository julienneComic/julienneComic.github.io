{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = with pkgs; [
    nodejs_20
    yarn
    nodePackages.prettier
  ];

  shellHook = ''
    export NODE_ENV=development
  '';
}
