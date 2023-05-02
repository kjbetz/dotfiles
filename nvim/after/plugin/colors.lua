function ColorMyPencils(color)
    color = color or "tokyonight"
    vim.cmd.colorscheme(color)
end

ColorMyPencils()

vim.g.tokyonight_transparent = vim.g.transparent_enabled
