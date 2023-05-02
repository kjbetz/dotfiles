require("telescope").setup {
    extensions = {
        file_browser = {
            theme = "tokyonight",
        }
    }
}

require("telescope").load_extension 'file_browser'

