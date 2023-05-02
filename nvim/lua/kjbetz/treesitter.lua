require('nvim-treesitter.configs').setup {
    ensure_installed = {
        "astro",
        "c_sharp",
        "css",
        "dockerfile",
        "go",
        "html",
        "javascript",
        "json",
        "lua",
        "rust",
        "scss",
        "typescript",
    },

    sync_install = false,

    auto_install = true,

    highlight = {
        enable = true,
    },

    rainbow = { enable = true, },

    indent = { enable = true, },

    additional_vim_regex_highlighting = false,
}

