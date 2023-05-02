local cmp = require'cmp'

cmp.setup({
    snippet = {
        -- REQUIRED - you must specifiy a snippet engine
        expand = function(args)
            require("luasnip").lsp_expand(args.body)
        end,
    },

    window = {
        -- completion - cmp.config.window.bordered(),
        -- documentation - cmp.config.window.bordered(),
    },

    mapping = cmp.mapping.preset.insert({
        ['<C-b>'] = cmp.mapping.scroll_docs(-4),
        ['<C=f>'] = cmp.mapping.scroll_docs(4),
        ['<C-Space>'] = cmp.mapping.complete(),
        ['<C-e>'] = cmp.mapping.abort(),
        ['<CR>'] = cmp.mapping.confirm({ select = true }),
    }),

    sources = {
        { name = "nvim_lsp" },
        { name = "luasnip" },
    }, {
        { name = "buffer" },
    }
})
