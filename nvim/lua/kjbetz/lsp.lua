local nnoremap = require("kjbetz.keymap").nnoremap
local util = require("lspconfig.util")

local on_attach = function(client, bufnr)
    -- Disable ls formatting in favore of Prettier
    -- client.server_capabilities.document_formatting = false

    -- Enable completion triggerd by <c-x><c-o>
    vim.api.nvim_buf_set_option(bufnr, "omnifunc", "v:lua.vim.lsp.omnifunc")

    local bufopts = { noremap = true, silent = true, buffer = bufnr }

    nnoremap("gD", vim.lsp.buf.declaration)
    nnoremap("gd", vim.lsp.buf.definition)
    nnoremap("K", vim.lsp.buf.hover)
    nnoremap("gi", vim.lsp.buf.implementation)
    nnoremap("<C-k>", vim.lsp.buf.signature_help)
    nnoremap("<leader>wa", vim.lsp.buf.add_workspace_folder)
    nnoremap("<leader>wr", vim.lsp.buf.remove_workspace_folder)
    nnoremap("<leader>wl", function()
        print(vim.inspect(vim.lsp.buf.list_workspace_folders()))
    end)
    nnoremap("<leader>D", vim.lsp.buf.type_definition)
    nnoremap("<leader>rn", vim.lsp.buf.rename)
    nnoremap("<leader>ca", vim.lsp.buf.code_action)
    nnoremap("gr", vim.lsp.buf.references)
    nnoremap("<leader>f", vim.lsp.buf.formatting)
end

local capabilities = vim.lsp.protocol.make_client_capabilities()
capabilities = require("cmp_nvim_lsp").default_capabilities(capabilities)

require("lspconfig")["omnisharp"].setup {
    on_attach = on_attach,
    capabilities = capabilities,
}

require("lspconfig")["rust_analyzer"].setup {
    on_attach = on_attach,
    capabilities = capabilities,
}

require("lspconfig")["angularls"].setup {
    on_attach = on_attach,
    capabilities = capabilities,
}


require("lspconfig")["gopls"].setup {
    on_attach = on_attach,
    capabilities = capabilities,
}

require("lspconfig")["pyright"].setup {
    on_attach = on_attach,
    capabilities = capabilities,
}

require("lspconfig")["html"].setup {
    on_attach = on_attach,
    capabilities = capabilities,
}

require("lspconfig")["lua_ls"].setup {
    on_attach = on_attach,
    capabilities = capabilities,
}

require("lspconfig")["tsserver"].setup {
    on_attach = on_attach,
    capabilities = capabilities,
}
