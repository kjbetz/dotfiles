vim.cmd [[packadd packer.nvim]]

return require('packer').startup(function()
    use 'wbthomason/packer.nvim'

    use 'folke/tokyonight.nvim'

    use 'xiyaowong/nvim-transparent'

    use 'kyazdani42/nvim-web-devicons'

    use { 'nvim-lualine/lualine.nvim',
        requires = { 'kyazdani42/nvim-web-devicons', opt = true }
    }

    use { 'akinsho/bufferline.nvim', tag = 'v2.*',
        requires = 'kyazdani42/nvim-web-devicons'
    }

    use { 'kyazdani42/nvim-tree.lua',
        requires = { 'kyazdani42/nvim-web-devicons' }
    }

    use { 'nvim-telescope/telescope.nvim',
        requires = { {'nvim-lua/plenary.nvim'} }
    }

    use 'nvim-telescope/telescope-file-browser.nvim'

    use { 'nvim-treesitter/nvim-treesitter',
        run = ':TSUpdate'
    }

    use "nvim-treesitter/nvim-treesitter-context"

    use { 'elgiano/nvim-treesitter-angular', branch = 'topic/jsx-fix' }

    use "jlcrochet/vim-razor"

    use "williamboman/mason.nvim"
    use "williamboman/mason-lspconfig.nvim"
    use "neovim/nvim-lspconfig"

    use 'hrsh7th/cmp-nvim-lsp'
    use 'hrsh7th/cmp-buffer'
    use 'hrsh7th/cmp-path'
    use 'hrsh7th/cmp-cmdline'
    use 'hrsh7th/nvim-cmp'
    use 'L3MON4D3/LuaSnip'
    use 'saadparwaiz1/cmp_luasnip'

    use "jose-elias-alvarez/null-ls.nvim"
    use "jay-babu/mason-null-ls.nvim"

    use "MunifTanjim/prettier.nvim"

    use "tpope/vim-fugitive"

    use 'github/copilot.vim'
end)
