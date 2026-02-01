include $(TOPDIR)/rules.mk

LUCI_TITLE:=Healthchecks.io
LUCI_PKGARCH:=all
PKG_NAME:=luci-app-healthchecks
PKG_VERSION:=0.1.1
PKG_RELEASE:=1

PKG_LICENSE:=MIT
PKG_MAINTAINER:=Jirah Cox <jirah@cox5.com>

include $(INCLUDE_DIR)/package.mk

define Package/luci-app-healthchecks
  SECTION:=luci
  CATEGORY:=LuCI
  SUBMENU:=3. Applications
  TITLE:=$(LUCI_TITLE)
  DEPENDS:=+healthchecks
  PKGARCH:=all
endef

define Build/Compile
  # nothing to build
endef

define Package/luci-app-healthchecks/install
	$(INSTALL_DIR) $(1)/usr/lib/lua/luci/controller
	$(INSTALL_BIN) ./luasrc/controller/healthchecks.lua \
		$(1)/usr/lib/lua/luci/controller/healthchecks.lua

	# HTML view is optional now; JS view is what GL.iNet uses
	$(INSTALL_DIR) $(1)/usr/lib/lua/luci/view/healthchecks
	$(INSTALL_BIN) ./luasrc/view/healthchecks/main.htm \
		$(1)/usr/lib/lua/luci/view/healthchecks/main.htm

	# JS-based LuCI view
	$(INSTALL_DIR) $(1)/www/luci-static/resources/view/healthchecks
	$(INSTALL_BIN) ./htdocs/luci-static/resources/view/healthchecks/main.js \
		$(1)/www/luci-static/resources/view/healthchecks/main.js
		
	# ACL permissions
	$(INSTALL_DIR) $(1)/usr/share/rpcd/acl.d
	$(INSTALL_DATA) ./root/usr/share/rpcd/acl.d/luci-app-healthchecks.json \
		$(1)/usr/share/rpcd/acl.d/luci-app-healthchecks.json
endef


$(eval $(call BuildPackage,luci-app-healthchecks))
