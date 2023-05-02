require("kjbetz.options")
require("kjbetz.remap")
require("kjbetz.plugins")

require("nvim-web-devicons").setup()

require("lualine").setup {
    options = {
        theme = "tokyonight"
    }
}

require("tokyonight").setup({
    style = "storm",
})

require("bufferline").setup { }

require("nvim-tree").setup {
    hijack_cursor = true,
    actions = {
        open_file = { quit_on_open = true },
    },
    view = {
        adaptive_size = true,
        side = 'right',
    }
}

require("kjbetz.telescope")

require("kjbetz.treesitter")

require("kjbetz.nvim-cmp")

require("kjbetz.mason")

require("kjbetz.lsp")
