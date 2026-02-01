local m = Map("healthchecks", translate("Healthchecks.io"),
    translate("Configure periodic pings to your Healthchecks.io slug."))

local s = m:section(TypedSection, "healthchecks", translate("Main settings"))
s.anonymous = true
s.addremove = false

-- Enabled flag
local enabled = s:option(Flag, "enabled", translate("Enable"))
enabled.rmempty = false

-- Slug input
local slug = s:option(Value, "slug", translate("Slug"),
    translate("Paste the Healthchecks.io UUID or path segment, e.g. 'project-key/my-router'."))
slug.datatype = "string"
slug.rmempty = false

-- Interval in seconds
local interval = s:option(Value, "interval", translate("Ping interval (seconds)"))
interval.datatype = "uinteger"
interval.default = "60"
interval.rmempty = false

return m
