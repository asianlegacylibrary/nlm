// Render modal depending on type
switch (type) {
    case 'Person':
        //vars specific to PERSON
        let { personEvent, personName, personGender } = source

        const buildPersonalDetails = (gender, lifeEvents) => {
            return [gender, lifeEvents].forEach((d, i) => {
                if (d) {
                    return (
                        <p key={i} className="meta-item">
                            {d}
                        </p>
                    )
                }
            })
        }

        const buildWorkEvents = events => {
            //log('build work pre', events)
            const ev = events.map((e, i) => {
                return (
                    <span key={i} className="spacer">
                        <a
                            href={e._url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {e._id}
                        </a>
                    </span>
                )
            })
            //log('build work events', ev)
            return ev
        }

        // EVENTS
        const events =
            personEvent == null ? null : unpackPersonEvent(personEvent)
        let lifeEvents = null,
            workEvents = null
        //log('what does event array look like?', events)
        if (events) {
            lifeEvents =
                events[0].length > 0 ? uniq(events[0]).join(', ') : null
            workEvents =
                events[1].length > 0 ? buildWorkEvents(events[1]) : null
        }

        //log('workEvents', workEvents)
        // GENDER
        let gender =
            personGender == null
                ? null
                : `${t('gender.gender')}: ${t(
                      `gender.gender-${bdrGender[personGender]}`
                  )}`

        //workEvents = workEvents == null ? null : workEvents
        let personalDetails =
            gender || lifeEvents
                ? buildPersonalDetails(gender, lifeEvents)
                : null

        return (
            <div className="detail-data">
                {metaDetail}
                <div className="modal-title">{label}</div>

                {!personalDetails ? null : (
                    <div className="meta-detail">{personalDetails}</div>
                )}
                {!workEvents ? null : (
                    <div className="meta-detail">
                        {t('modal.geography-associated-places')}:{workEvents}
                    </div>
                )}
                <div className="meta-grouping">
                    {unpackPersonName(personName)}
                </div>
                {notes}
                {closeBtn}
            </div>
        )
    case 'Topic':
        //vars specific to TOPIC, nothing noted as unique to TOPIC
        return (
            <div className="detail-data">
                {metaDetail}
                <div className="modal-title">{label}</div>
                {notes}
                {closeBtn}
            </div>
        )
}
