package org.finos.vuu.person;

import org.finos.toolbox.time.Clock;
import org.finos.vuu.core.table.DataTable;
import org.finos.vuu.core.table.RowWithData;
import org.finos.vuu.provider.Provider;

import java.util.Map;

public class PersonProvider implements Provider {

    private final DataTable table;
    private final PersonStore personStore;
    private final Clock clock;

    public PersonProvider(final DataTable table, PersonStore personStore, Clock clock){
        this.table = table;
        this.personStore = personStore;
        this.clock = clock;
    }

    @Override
    public void doStart() {

        for (Person person : personStore.GetAll()) {
            var row = new RowWithData(person.Id, Map.of( "Id", person.Id, "Name", person.Name, "Account", person.AccountNumber));
            table.processUpdate(person.Id, row , clock.now());
        }
    }

    @Override
    public void doStop() {

    }

    @Override
    public void doInitialize() {

    }

    @Override
    public void doDestroy() {

    }

    @Override
    public String lifecycleId() {
        return null;
    }

    @Override
    public String toString() {
        return Provider.super.toString();
    }

    @Override
    public void subscribe(String key) {

    }
}
