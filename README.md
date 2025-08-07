# mcp-registry-interface

🔍 **MCP server for interfacing with the official Model Context Protocol registry**

Enables Claude and other MCP clients to dynamically discover, browse, search, and manage MCP servers directly from GitHub. Fetches real-time data from the official MCP servers repository.

## 🚀 Features

- **🔍 Real-time Search** - Find MCP servers from live GitHub data
- **📦 Server Details** - Get comprehensive information including installation guides
- **📂 Categories** - Browse servers by functionality (filesystem, database, etc.)
- **🔄 Auto-refresh** - Cached data with configurable refresh intervals
- **🔒 Rate Limit Aware** - Supports GitHub tokens for higher API limits
- **❌ No Mock Data** - Always provides real data or fails transparently

## 📋 Available Tools

| Tool | Description |
|------|-------------|
| `registry_search_servers` | Search MCP servers by name, description, or tags |
| `registry_get_server_details` | Get detailed server information and installation guides |
| `registry_list_categories` | List all server categories with descriptions |
| `registry_refresh_data` | Force refresh GitHub data (bypasses cache) |

## 🛠️ Installation

### NPM (Recommended)
```bash
npx mcp-registry-interface
```

### Manual Installation
```bash
git clone <repository-url>
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
        "GITHUB_TOKEN": "your-github-token-optional"
      }
    }
  }
}
```

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GITHUB_TOKEN` | GitHub personal access token for higher rate limits | No (60 requests/hour without) |

Without a GitHub token, you get 60 API calls per hour. With a token, you get 5,000 calls per hour.

## 🎯 Example Usage

```
User: "Find MCP servers for working with databases"
Claude: Uses registry_search_servers with category="database"

User: "Show me details about the filesystem server"
Claude: Uses registry_get_server_details with serverId="mcp-filesystem"

User: "What categories of MCP servers are available?"
Claude: Uses registry_list_categories
```

## 🔒 Security & Reliability

- ✅ **Real Data Only** - No mock/fake data that could mislead developers
- ✅ **Transparent Failures** - Clear error messages when GitHub API is unavailable  
- ✅ **Rate Limit Handling** - Proper GitHub API rate limit management
- ✅ **Input Validation** - Secure parameter checking and sanitization
- ✅ **No Hardcoded Secrets** - All tokens from environment variables

## 🧪 Development & Testing

The server fetches live data from GitHub's API:

```bash
# Basic usage (60 requests/hour)
node src/index.js

# With GitHub token (5000 requests/hour) 
GITHUB_TOKEN=your_token_here node src/index.js

# Test the server
node static-test.js
```

## 🛡️ Error Handling

When GitHub API is unavailable, the server:
- ❌ Does NOT provide fake/mock data
- ✅ Returns clear error messages
- ✅ Explains how to resolve the issue
- ✅ Maintains cache for recent successful requests

## 🤝 Contributing

This tool helps accelerate the MCP ecosystem by making server discovery seamless with real, up-to-date information.

1. Fork the repository
2. Create a feature branch  
3. Make your changes
4. Test with live GitHub data
5. Submit a pull request

## 📚 Data Source

- **Primary Source**: [modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers) README
- **API**: GitHub Contents API
- **Update Frequency**: 5-minute cache with manual refresh capability
- **Parsing**: Extracts official reference servers and community servers

## 📄 License

MIT License - see LICENSE file for details.

---

**🎯 Philosophy**: This tool believes in transparency - real data or honest failure, never misleading mock data.
