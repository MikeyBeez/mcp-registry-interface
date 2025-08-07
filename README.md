# mcp-registry-interface

🔍 **MCP server for interfacing with the official Model Context Protocol registry**

Enables Claude and other MCP clients to dynamically discover, browse, search, and manage MCP servers from the official registry. This is a meta-tool that helps AI systems find and integrate other tools.

## 🚀 Features

- **🔍 Search** - Find MCP servers by name, description, or tags
- **📦 Server Details** - Get comprehensive information about any server
- **📂 Categories** - Browse servers by category (filesystem, database, etc.)
- **🔥 Popular Servers** - Discover trending and most-used servers
- **📥 Installation Guides** - Get setup instructions for any server
- **🔒 Secure** - Uses environment variables for credentials, no hardcoded secrets

## 📋 Available Tools

| Tool | Description |
|------|-------------|
| `registry_search_servers` | Search for MCP servers with filters |
| `registry_get_server_details` | Get detailed server information |
| `registry_list_categories` | List all server categories |
| `registry_get_popular_servers` | Get trending/popular servers |
| `registry_get_installation_guide` | Get installation instructions |

## 🛠️ Installation

### NPM (Recommended)
```bash
npx mcp-registry-interface
```

### Manual Installation
```bash
git clone https://github.com/username/mcp-registry-interface
cd mcp-registry-interface
npm install
npm start
```

## ⚙️ Configuration

Add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "registry-interface": {
      "command": "npx",
      "args": ["mcp-registry-interface"],
      "env": {
        "MCP_REGISTRY_URL": "https://api.modelcontextprotocol.io",
        "MCP_REGISTRY_API_KEY": "your-api-key-here-optional"
      }
    }
  }
}
```

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MCP_REGISTRY_URL` | Registry API base URL | No (defaults to official) |
| `MCP_REGISTRY_API_KEY` | API key for write operations | No (read-only without) |

## 🎯 Example Usage

```
User: "Find MCP servers for working with databases"
Claude: Uses registry_search_servers with category="database"

User: "Show me details about the filesystem server"
Claude: Uses registry_get_server_details with serverId="mcp-filesystem"

User: "What are the most popular MCP servers?"
Claude: Uses registry_get_popular_servers
```

## 🔒 Security Features

- ✅ **No hardcoded credentials** - All sensitive data from environment variables
- ✅ **Read-only by default** - No API key required for browsing
- ✅ **Secure fallbacks** - Mock data for development/testing
- ✅ **Input validation** - Proper parameter checking and sanitization

## 🧪 Development

The server includes mock data for development when the official registry is unavailable:

```bash
# Development with mock data
node src/index.js

# Production with real registry
MCP_REGISTRY_URL=https://api.modelcontextprotocol.io node src/index.js
```

## 🤝 Contributing

This tool helps accelerate the MCP ecosystem by making server discovery and installation seamless. Contributions welcome!

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with both mock and real registry data
5. Submit a pull request

## 📚 Related Projects

- [Official MCP Registry](https://github.com/modelcontextprotocol/registry)
- [MCP Servers Collection](https://github.com/modelcontextprotocol/servers)
- [Model Context Protocol](https://modelcontextprotocol.io)

## 📄 License

MIT License - see LICENSE file for details.

---

**🎭 Meta-Intelligence**: This tool demonstrates the Kolmogorov Convergence Principle - it's a tool that helps find tools, enabling recursive self-improvement of AI capabilities.
