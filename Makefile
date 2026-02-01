# Minimal package Makefile stub so SDK toplevel.mk prereqs pass.
# Actual packages live in subdirectories under package/.

include $(TOPDIR)/rules.mk
include $(INCLUDE_DIR)/subdir.mk

PKG_SUBDIRS := feeds kernel toolchain healthchecks luci-app-healthchecks

$(eval $(call BuildSubdir,$(PKG_SUBDIRS)))