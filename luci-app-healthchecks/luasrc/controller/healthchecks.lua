module("luci.controller.healthchecks", package.seeall)

function index()
    if not nixio.fs.access("/etc/config/healthchecks") then
        return
    end

    entry(
        {"admin", "services", "healthchecks"},
        view("healthchecks/main"),
        "Healthchecks.io",
        60
    ).dependent = true
end
