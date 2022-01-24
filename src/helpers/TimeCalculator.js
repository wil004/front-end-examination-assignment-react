function timeCalculator (timeZonesArray) {
    return timeZonesArray.map((item) => {
        const d = new Date();
        let utcTimeHours = d.getUTCHours();
        let utcTimeMinutes = d.getUTCMinutes();
        let timeZone = item.substring(item.indexOf('C') + 1);
        let timeZoneHours = +(timeZone.charAt(1) + timeZone.charAt(2));
        if (utcTimeMinutes < 10) {
            utcTimeMinutes = '0' + utcTimeMinutes
        }
        if (timeZone.charAt(0) === '+') {
            if (utcTimeHours + timeZoneHours >= 24) {
                if ((utcTimeHours + timeZoneHours - 24) < 10) {
                    return '0' + (utcTimeHours + timeZoneHours - 24) + ':' + utcTimeMinutes;
                } else {
                    return (utcTimeHours + timeZoneHours - 24) + ':' + utcTimeMinutes;
                }
            } else { if (utcTimeHours + timeZoneHours < 10) {
                return '0' + (utcTimeHours + timeZoneHours) + ':' + utcTimeMinutes;
            } else {
                return (utcTimeHours + timeZoneHours) + ':' + utcTimeMinutes;
            }
            }
        } else if (timeZone.charAt(0) === '-') {
            if (utcTimeHours - timeZoneHours < 0) {
                if ((utcTimeHours - timeZoneHours + 24) < 10) {
                    return '0' + (utcTimeHours - timeZoneHours + 24) + ':' + utcTimeMinutes;
                } else {
                    return (utcTimeHours - timeZoneHours + 24) + ':' + utcTimeMinutes;
                }}
        } else {
            if (utcTimeHours - timeZoneHours < 10) {
                return '0' + (utcTimeHours - timeZoneHours) + ':' + utcTimeMinutes;
            } else {
                return (utcTimeHours - timeZoneHours) + ':' + utcTimeMinutes;
            }
        }
    })
}

export default timeCalculator