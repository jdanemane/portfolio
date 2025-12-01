# GitHub MCP Server Setup Guide

This guide will help you set up the GitHub MCP (Model Context Protocol) Server in Cursor IDE.

## Prerequisites

1. **Docker Installation**: Ensure Docker is installed and running on your system.
   - Check if Docker is installed: `docker --version`
   - If not installed, download from [docker.com](https://www.docker.com/products/docker-desktop)

2. **GitHub Personal Access Token (PAT)**: You'll need a GitHub PAT with the following permissions:
   - `repo` - Access to repository operations
   - `read:packages` - Access to Docker images
   - `read:org` - Access to organization team information (if needed)

## Step 1: Create a GitHub Personal Access Token

1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
   - Direct link: https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Give it a descriptive name (e.g., "Cursor MCP Server")
4. Select the following scopes:
   - `repo` (Full control of private repositories)
   - `read:packages` (Download packages from GitHub Package Registry)
   - `read:org` (Read org and team membership, read org projects) - optional
5. Click "Generate token"
6. **IMPORTANT**: Copy the token immediately - you won't be able to see it again!

## Step 2: Store Your PAT Securely

You have two options:

### Option A: Environment Variable (Recommended)

Add to your shell profile (`~/.zshrc` or `~/.bash_profile`):

```bash
export GITHUB_PERSONAL_ACCESS_TOKEN=your_token_here
```

Then reload your shell:
```bash
source ~/.zshrc  # or source ~/.bash_profile
```

### Option B: Cursor Settings (Alternative)

The MCP server configuration in Cursor settings will prompt you for the token when needed.

## Step 3: Verify Docker is Running

```bash
docker ps
```

If this command works without errors, Docker is running correctly.

## Step 4: Test the MCP Server

You can test if the MCP server works by running:

```bash
docker run -i --rm -e GITHUB_PERSONAL_ACCESS_TOKEN=$GITHUB_PERSONAL_ACCESS_TOKEN ghcr.io/github/github-mcp-server
```

If you see output, the server is working correctly. Press Ctrl+C to stop it.

## Step 5: Cursor Configuration

The GitHub MCP server has been added to your Cursor settings. The configuration uses:

- **Server Type**: Docker container
- **Image**: `ghcr.io/github/github-mcp-server`
- **Authentication**: Uses `GITHUB_PERSONAL_ACCESS_TOKEN` environment variable

## Troubleshooting

### Docker not found
- Install Docker Desktop from [docker.com](https://www.docker.com/products/docker-desktop)
- Make sure Docker is running (check the Docker icon in your menu bar)

### Authentication errors
- Verify your GitHub PAT is valid and has the correct permissions
- Check that the `GITHUB_PERSONAL_ACCESS_TOKEN` environment variable is set correctly
- You can verify by running: `echo $GITHUB_PERSONAL_ACCESS_TOKEN`

### Server not connecting
- Restart Cursor after configuring the MCP server
- Check Cursor's output panel for MCP-related errors
- Verify Docker is running: `docker ps`

## Security Best Practices

1. **Never commit your PAT to version control** - It's already in `.gitignore`
2. **Use minimal scopes** - Only grant the permissions you need
3. **Rotate tokens regularly** - Update your PAT periodically
4. **Revoke unused tokens** - Remove tokens you're no longer using

## Resources

- [GitHub MCP Server Repository](https://github.com/github/github-mcp-server)
- [GitHub Personal Access Tokens Documentation](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)
- [MCP Protocol Documentation](https://modelcontextprotocol.io/)

