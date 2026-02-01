# Healthchecks.io Client for OpenWrt

A lightweight [Healthchecks.io](https://healthchecks.io/) heartbeat monitoring client for OpenWrt routers, with optional LuCI web interface.

## Features

- Periodic ping to Healthchecks.io URLs
-️ Web-based configuration via LuCI (on supported firmware)
- UCI-based configuration for all routers
- Architecture-independent (works on any OpenWrt router)
- Minimal dependencies (just `wget`)
- Auto-starts on boot
- Configuration changes apply automatically without restart

## Installation

### Quick Install

Download and install both packages:

```sh
# SSH into router and download packages
wget https://github.com/mysterious1der/router-pings/releases/latest/download/healthchecks_0.1.1-1_all.ipk
wget https://github.com/mysterious1der/router-pings/releases/latest/download/luci-app-healthchecks_0.1.1-1_all.ipk

# Install
opkg update
opkg install healthchecks_0.1.1-1_all.ipk
opkg install luci-app-healthchecks_0.1.1-1_all.ipk
```

The service will start automatically after installation.

### Build from Source

Requirements:
- OpenWrt SDK for your target architecture
- Standard build tools

```sh
# Clone repository
git clone https://github.com/mysterious1der/router-pings.git
cd luci-app-healthchecks-openwrt

# Copy to your OpenWrt SDK
cp -r healthchecks /path/to/openwrt-sdk/package/
cp -r luci-app-healthchecks /path/to/openwrt-sdk/package/

# Build
cd /path/to/openwrt-sdk
make package/healthchecks/compile
make package/luci-app-healthchecks/compile

# Find packages in bin/packages/*/base/
```

## Configuration

### Via LuCI Web Interface

Navigate to **Services → Healthchecks.io** in your LuCI web interface.

Configure:
- **Enabled**: Check to enable the service
- **Ping URL**: Your Healthchecks.io ping URL (e.g., `https://hc-ping.com/your-uuid-here`)
- **Interval**: How often to ping (in minutes)

Click **Save & Apply** to activate changes.

**Note:** LuCI interface requires standard OpenWrt or newer GL.iNet firmware. Older GL.iNet firmware can still use UCI configuration (see below).

### Via UCI Command Line

```sh
# Enable the service
uci set healthchecks.main.enabled='1'

# Set your Healthchecks.io URL
uci set healthchecks.main.url='https://hc-ping.com/your-uuid-here'

# Set ping interval (in minutes)
uci set healthchecks.main.interval_minutes='5'

# Save and apply
uci commit healthchecks
```

Changes take effect automatically within the current interval period (no restart required).

### Manual Service Control

```sh
# Start service
/etc/init.d/healthchecks start

# Stop service
/etc/init.d/healthchecks stop

# Restart service
/etc/init.d/healthchecks restart

# Enable on boot
/etc/init.d/healthchecks enable

# Disable on boot
/etc/init.d/healthchecks disable
```

## Monitoring

View service logs:

```sh
logread | grep healthchecks
```

Or watch in real-time:

```sh
logread -f | grep healthchecks
```

You should see messages like:
```
healthchecks: Ping successful (interval: 5m)
```

## Compatibility

### Tested On
- GL.iNet GL-MT6000 (OpenWrt 23.05)
- GL.iNet GL-AXT1800 (GL.iNet firmware 4.x)

### Requirements
- OpenWrt 21.02 or newer
- `wget` (included in most OpenWrt builds)
- LuCI (optional, for web interface)

### GL.iNet Compatibility
- **Newer models** (MT6000, etc.): Full LuCI interface works
- **Older firmware** (4.x): Backend works perfectly, configure via UCI
- All GL.iNet or OpenWRT routers can use the service, just some need UCI configuration

## Uninstallation

```sh
opkg remove luci-app-healthchecks
opkg remove healthchecks
```

Configuration file `/etc/config/healthchecks` will be preserved. To remove it:

```sh
rm /etc/config/healthchecks
```

## Troubleshooting

### Service not starting
Check if it's enabled:
```sh
uci show healthchecks.main.enabled
```

Should show `'1'`. If not, enable it:
```sh
uci set healthchecks.main.enabled='1'
uci commit healthchecks
/etc/init.d/healthchecks restart
```

### Pings not appearing on Healthchecks.io
1. Verify your URL is correct:
   ```sh
   uci show healthchecks.main.url
   ```

2. Test manually:
   ```sh
   wget -O- "$(uci get healthchecks.main.url)"
   ```

3. Check logs for errors:
   ```sh
   logread | grep healthchecks
   ```

### LuCI menu not appearing
- GL.iNet older firmware: Use UCI configuration instead
- Clear LuCI cache and restart:
  ```sh
  rm -rf /tmp/luci-*
  /etc/init.d/uhttpd restart
  ```

## How It Works

The `healthchecks-ping` service runs continuously in the background:
1. Reads configuration from `/etc/config/healthchecks`
2. Sends HTTP GET request to your Healthchecks.io URL
3. Sleeps for the configured interval
4. Repeats (re-reading config each cycle for instant updates)

## Contributing

Contributions welcome! Please open an issue or pull request on GitHub.

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Credits

Created by Jirah Cox

Healthchecks.io is a service by [Healthchecks.io](https://healthchecks.io/)

## Support

- Issues: https://github.com/yourusername/luci-app-healthchecks-openwrt/issues
- Healthchecks.io documentation: https://healthchecks.io/docs/
