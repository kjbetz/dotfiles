local nnoremap = require('kjbetz.keymap').nnoremap

-- Telescope
nnoremap("<leader>ff", "<cmd>Telescope find_files<CR>")
nnoremap("<leader>fg", "<cmd>Telescope live_grep<CR>")
nnoremap("<leader>fB", "<cmd>Telescope buffers<CR>")
nnoremap("<leader>fh", "<cmd>Telescope help_tags<CR>")

-- Telescope file browser
nnoremap("<leader>fb", "<cmd>Telescope file_browser<CR>")

-- nvim-tree
nnoremap("<leader>pv", "<cmd>NvimTreeToggle<CR>")

