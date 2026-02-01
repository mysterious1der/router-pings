include $(TOPDIR)/rules.mk

PKG_NAME:=healthchecks
PKG_VERSION:=0.1.1
PKG_RELEASE:=1

PKG_LICENSE:=MIT
PKG_MAINTAINER:=Jirah Cox <jirah@cox5.com>


include $(INCLUDE_DIR)/package.mk

define Package/healthchecks
  SECTION:=net
  CATEGORY:=Network
  TITLE:=Healthchecks.io heartbeat client for OpenWrt
  URL:=https://healthchecks.io/
  DEPENDS:=+curl
  PKGARCH:=all
endef

define Package/healthchecks/description
A minimal client that periodically pings a Healthchecks.io URL from your router.
endef

define Build/Compile
	# nothing to build
endef

define Package/healthchecks/install
	$(INSTALL_DIR) $(1)/usr/bin
	$(INSTALL_BIN) ./files/usr/bin/healthchecks-ping $(1)/usr/bin/healthchecks-ping

	$(INSTALL_DIR) $(1)/etc/config
	$(INSTALL_CONF) ./files/etc/config/healthchecks $(1)/etc/config/healthchecks

	$(INSTALL_DIR) $(1)/etc/init.d
	$(INSTALL_BIN) ./files/etc/init.d/healthchecks $(1)/etc/init.d/healthchecks
endef

define Package/healthchecks/postinst
#!/bin/sh
[ -n "$${IPKG_INSTROOT}" ] || {
	/etc/init.d/healthchecks enable
	/etc/init.d/healthchecks start
}
exit 0
endef

define Package/healthchecks/prerm
#!/bin/sh
[ -n "$${IPKG_INSTROOT}" ] || {
	/etc/init.d/healthchecks stop
	/etc/init.d/healthchecks disable
}
exit 0
endef

$(eval $(call BuildPackage,healthchecks))
