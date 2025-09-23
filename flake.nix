{
    inputs = {
        nixpkgs.url = "github:nixos/nixpkgs/nixpkgs-unstable";
    };

    outputs = { self, nixpkgs }: 
        let
            pkgs = nixpkgs.legacyPackages."x86_64-linux"; 

            forAllSystems = nixpkgs.lib.genAttrs [ "x86_64-linux" "aarch64-linux" ];
        in {
            devShells."x86_64-linux" = {
                default = pkgs.mkShell {
                    packages = with pkgs; [
                        nodejs
                    ];

                    shellHook = ''
                        export NPM_CONFIG_PREFIX="$HOME/.npm"
                    '';
                };
            };
        };
}
